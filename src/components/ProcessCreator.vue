<template>
  <div class="container p-0">
    <div class="row no-gutters mb-3">
      <div class="col">
        <h2 class="text-center">Create a process</h2>

        <div class="d-flex justify-content-around">
          <button type="button"
            class="btn btn-secondary"
            disabled
          >
            <font-awesome-icon :icon="['fas', 'upload']"/>
            <span class="ml-1">Upload an existing process</span>
          </button>

          <app-xlsx-export
            :sheets="sheets"
            :filename="filename"
            class="btn btn-secondary"
            :disabled="editingProcess === true"
          >
            <font-awesome-icon :icon="['fas', 'file-export']"/>
            <span class="ml-1">Export to .xlsx</span>
          </app-xlsx-export>

          <app-xml-export
            :xmlString="convertedXml"
            :filename="filename"
            class="btn btn-secondary"
            :disabled="editingProcess === true"
          >
            <font-awesome-icon :icon="['fas', 'file-export']"/>
            <span class="ml-1">Export to .xml</span>
          </app-xml-export>
        </div>
      </div>
    </div>

    <div class="row no-gutters mb-3">
      <div class="col">

        <component
          :is="editingProcess ? 'app-process-edit' : 'app-process-view'"
          :process="process"
        />

        <mdb-btn-group size="sm">
          <button type="button"
            class="btn btn-success"
            @click="editingProcess = false"
            v-if="editingProcess"
          >
            <font-awesome-icon :icon="['fas', 'save']"/>
          </button>

          <button type="button"
            class="btn btn-primary"
            @click="editingProcess = true"
            v-else
          >
            <font-awesome-icon :icon="['fas', 'pencil-alt']"/>
          </button>
        </mdb-btn-group>
      </div>
    </div>

    <hr class="my-4"/>

    <div class="row no-gutters mb-3">
      <div class="col text-center">
          <font-awesome-icon :icon="['fas', 'flag']" class="mr-1"/>
          <span>Your process starts here</span>
      </div>
    </div>

    <span
      v-for="node,nodeIter in process.nodes"
      :key="nodeIter"
    >
      <div class="row no-gutters mb-3"
        v-if="nodeIter < process.nodes.length"
      >
        <div class="col text-center">
          <font-awesome-icon :icon="['fas', 'arrow-down']"/>
        </div>
      </div>

      <div class="row no-gutters mb-3">
        <div class="col">
          <component
            :is="nodeIter === editedNode ? 'app-node-edit' : 'app-node-view'"
            :node="node"
          />

          <div class="text-right">
            <mdb-btn-group size="sm">
              <button
                type="button"
                class="btn btn-info"
                @click="appendNode()"
                v-if="nodeIter === process.nodes.length - 1"
              >
                <font-awesome-icon :icon="['fas', 'plus']"/>
                <span class="ml-1">Add node</span>
              </button>

              <button type="button"
                class="btn btn-info"
                :disabled="nodeIter === 0"
                @click="moveNode(nodeIter, 0)"
              >
                <font-awesome-icon :icon="['fas', 'angle-double-up']"/>
              </button>
              <button type="button"
                class="btn btn-info"
                :disabled="nodeIter === 0"
                @click="moveNode(nodeIter, nodeIter-1)"
              >
                <font-awesome-icon :icon="['fas', 'chevron-up']"/>
              </button>

              <button type="button"
                class="btn btn-info"
                @click="editedNode = null"
                v-if="nodeIter === editedNode"
              >
                <font-awesome-icon :icon="['fas', 'save']"/>
              </button>
              <button type="button"
                class="btn btn-info"
                @click="editedNode = nodeIter"
                v-else
              >
                <font-awesome-icon :icon="['fas', 'pencil-alt']"/>
              </button>
              <button type="button"
                class="btn btn-info"
                :disabled="nodeIter === process.nodes.length - 1"
                @click="moveNode(nodeIter, nodeIter+1)"
              >
                <font-awesome-icon :icon="['fas', 'chevron-down']"/>
              </button>
              <button type="button"
                class="btn btn-info"
                :disabled="nodeIter === process.nodes.length - 1"
                @click="moveNode(nodeIter, process.nodes.length - 1)"
              >
                <font-awesome-icon :icon="['fas', 'angle-double-down']"/>
              </button>

              <button type="button"
                class="btn btn-danger"
                :disabled="process.nodes.length === 1"
                @click="deleteNode(nodeIter)"
              >
                <font-awesome-icon :icon="['fas', 'trash-alt']"/>
              </button>
            </mdb-btn-group>
          </div>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
import _ from 'lodash';
import XLSX from 'xlsx/xlsx';
import { processToXml } from '~/utils/processToXml';
import { processToSheets } from '~/utils/processToSheets';

export default {
  data() {
    return {
      process: {
        title: 'A brand new process to know about you',
        description: 'A basic process to ask about one\'s personal life.',
        nodes: [
          {
            type: 'action',
            title: 'Personal information',
            description: 'Start a new process by doing this task. Tell us about you.',
            forms: [
              {
                inputs: [
                  {
                    type: 'text',
                    label: 'Your name',
                    helpText: 'A simple input. Just enter your name',
                  },
                ],
              },
              {
                inputs: [
                  {
                    type: 'text',
                    label: 'What do you like to do?',
                    helpText: 'Write whatever you like',
                  },
                  {
                    type: 'select',
                    label: 'Which currency do you use more often?',
                    helpText: 'Choose any option',
                    options: [
                      {
                        label: 'Peso mexicano',
                        value: 'MXN',
                      },
                      {
                        label: 'US dolar',
                        value: 'USD',
                      },
                      {
                        label: 'Euro',
                        value: 'EUR',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      editedNode: null,
      editingProcess: false,

      defaultNode: {
        type: 'action',
        title: 'New amazing node',
        description: 'A simple node',
        forms: [
          {
            inputs: [
              {
                type: 'text',
                label: 'Basic text input',
                helpText: 'Enter some random text',
              },
              {
                type: 'select',
                label: 'Basic selector input',
                helpText: 'Choose any option',
                options: [
                  {
                    label: 'First option',
                    value: 1,
                  },
                  {
                    label: 'Second option',
                    value: 2,
                  },
                  {
                    label: 'Another option',
                    value: 'another',
                  },
                ],
              },
            ],
          },
        ],
      },
    };
  },

  computed: {
    filename() {
      return _.kebabCase(this.process.title);
    },

    convertedXml() {
      return processToXml(this.process);
    },

    sheets() {
      return processToSheets(this.process);
    },
  },

  methods: {
    appendNode() {
      const vm = this;

      vm.process.nodes.push(_.cloneDeep(vm.defaultNode));
      vm.editedNode = vm.process.nodes.length - 1;
    },

    deleteNode(index) {
      const vm = this;

      vm.process.nodes.splice(index, 1);
    },

    moveNode(fromIndex, toIndex) {
      this.move(this.process.nodes, fromIndex, toIndex);
    },

    // Utility
    // TODO: Dry. Move to a helper file
    move(arr, fromIndex, toIndex) {
      arr.splice(toIndex, 0, arr.splice(fromIndex, 1)[0]);
    },

    importExcel(event) {
      var input = event.target;
      var reader = new FileReader();
      reader.onload = () => {
        var fileData = reader.result;
        var wb = XLSX.read(fileData, {type : 'binary'});
        wb.SheetNames.forEach((sheetName) => {
          var rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
          this.excelData.push({
            name: sheetName,
            data: rowObj,
          });
        })
      };
      reader.readAsBinaryString(input.files[0]);
    }
  },
};
</script>
