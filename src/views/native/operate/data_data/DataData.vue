<template>
  <div>
    <!--    <DirectoryDescription :directory_id="directory_id" :is_open_data="is_open_data"></DirectoryDescription>-->
    <i-button @click="init_table">SEARCH</i-button>
    <i-button @click="init_insert_">ADD</i-button>
    <!--search area-->
    <divider orientation="left" style="font-size: 12px;">
      <i-button
        @click="function(){search.expand_status=!search.expand_status;}">
        EXPAND/COLLAPSE SEARCH CONDITION AREA
      </i-button>
    </divider>
    <div v-if="search.expand_status" style="margin-left: 10px">
      <!--dynamic search form-->
      <i-form :model="search.data"
              :label-width="80">
        <row>
          <i-col span="6" v-for="item in search.template">
            <form-item :label="item.label" :prop="item.prop">
              <i-input v-model="item.v_model"></i-input>
            </form-item>
          </i-col>
        </row>
      </i-form>
    </div>

    <split>
      <div slot="left"> <!--数据树-->

      </div>
      <div slot="right"> <!--数据-->
        <div>
          <i-table
            stripe border
            :columns="columns" :data="data" :loading="loading"
          ></i-table>
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <page show-sizer :total="page.total" :current="1"
                    @on-change="function(current){page.current = current;init_table();}"
                    @on-page-size-change="function(page_size){page.page_size = page_size;init_table();}"
              />
            </div>
          </div>
        </div>

      </div>
    </split>
    <div>
    </div>
  </div>
</template>

<script>
  import {Tree, VueTreeList} from 'vue-tree-list'
  import DirectoryDescription from "@/components/directory/DirectoryDescription";
  import designer_data_struct from "@/views/native/designer/designer_data/designer_data_struct/designer_data_struct";
  import designer_data_data from "@/views/native/operate/data_board_data";
  import component_table from "@/components/table";

  export default {
    name: "DataData",
    props: {
      directory_id: {
        default: 24,
        type: Number,
      },
      split_value: {
        default: 0.2,
      },
      is_open_data: {
        default: false,
        type: Boolean,
      },
    },
    components: {
      DirectoryDescription,
      VueTreeList,
    },
    data() {
      return {
        column_keys: [],
        columns: [],
        default_values: {},
        data: [],
        data_status: [],
        data_status_details_tree: new Tree([]),
        data_status_details: {
          display: false,
          log_list: [],
        },
        data_line_backup: {},
        loading: false,
        is_in_opt: false,
        opt_name: "",
        opt_line: -1,
        page: {
          current: 1,
          total: 0,
          page_size: 10
        },
        search: {
          expand_status: false,
          data: {},
          template: [],
        },
        associate: {
          trigger: {
            "insert": [],
            "update": [],
            "delete": [],
          },
        },
        data_event_2_logic: {
          cur_choose: {
            value: [],
            logic_id: '',
            func_name: '',
          },
          data: [],
        },
      }
    },
    methods: {
      async init_table_column() {
        await component_table.cancel_opt_data(this);
        this._data.loading = true;
        try {
          const data_struct_list = await designer_data_struct.select_({'did': this.directory_id});
          if (data_struct_list < 1) {
            this._data.loading = false;
            return;
          }
          const column_width = "10%";
          // id
          this._data.column_keys.push('id');
          this._data.columns.push({
            title: 'id',
            key: 'id',
            width: 50
          });
          // basic column
          for (const item of data_struct_list) {
            const code = item["code"];
            const meaning = item["meaning"];
            this._data.default_values[code] = item["default_value"];
            this._data.column_keys.push(code);
            this._data.columns.push(component_table.editable_table_common_column(this, meaning, code, column_width));
            this._data.search.template.push({"label": meaning, "prop": code, "v_model": ""});
          }
          // operation column
          if (!this.is_open_data) {
            this._data.columns.push(component_table.editable_table_common_operation_column(this));
          }
          this.$Message.success('query data data columns success');
        } catch (e) {
          console.log(e);
          this.$Message.error(e.response.data);
        }
        this._data.loading = false;
      },
      async init_table() {
        await component_table.cancel_opt_data(this);
        this._data.loading = true;
        try {
          /*                    const request_standard = {
                                  page_current: -1,
                                  page_size: 10,
                                  search: {},
                                  order: [],
                              }
                              const resp_standard = {
                                  page_total: 10,
                                  data: [],

                                  page_current: -1,
                                  page_size: 10,
                                  search: {},
                                  order: [],
                              }*/
          // page & search (order,search with express)
          const request_data = {
            page_current: this._data.page.current,
            page_size: this._data.page.page_size,
            search: {'did': this.directory_id},
          };
          // gen search
          const search_list = this._data.search.template;
          for (const item of search_list) {
            const prop = item["prop"];
            const v_model = item["v_model"];
            if (!v_model || v_model == '') continue;
            request_data.search[prop] = v_model;
          }
          request_data["is_open_data"] = this.is_open_data;
          const resp_data = await designer_data_data.select_(request_data);
          this._data.page.total = resp_data['page_total'];
          this._data.data = resp_data['data'];
          this.$Message.success('query data_struct success');
          // await this.init_data_logic_trigger_status();
          // status column
          // if (this._data.columns.length < this._data.column_keys.length + 2)
          //     this._data.columns.push(component_table.table_column_operation_status(this));
        } catch (e) {
          console.log(e);
          this.$Message.error(e.response.data);
        } finally {
          this._data.loading = false;
        }
      },
      // async init_associate() {
      //   // trigger
      //   const designer_data_logic_trigger_list = await designer_data_logic_trigger.select_({'data_id': this.directory_id});
      //   for (const item of designer_data_logic_trigger_list) {
      //     this._data.associate.trigger[item["type"]].push(item["logic_id"] + ":" + item["func_name"]);
      //   }
      // },
      // async init_data_logic_trigger_status() {
      //   if (!this._data.data || this._data.data.length < 1) return;
      //   const data_id = this.directory_id;
      //   let data_data_data_id_list_str = "";
      //   for (const item of this._data.data) {
      //     const data_data_id = item["id"];
      //     data_data_data_id_list_str += "'" + data_id + "_" + data_data_id + "', ";
      //   }
      //   data_data_data_id_list_str = data_data_data_id_list_str.substring(0, data_data_data_id_list_str.length - 2);
      //   try {
      //     let net_request_result = await designer_data_logic_trigger.select_batch_status({"data_data_data_id_list_str": data_data_data_id_list_str});
      //     this._data.data_status = net_request_result;
      //     this.$Message.success('query data logic trigger success');
      //   } catch (e) {
      //     console.log(e);
      //     this.$Message.error(e.response.data);
      //   }
      // },
      init_insert_() {
        component_table.init_insert_(this);
      },
      async insert_(component, data_data) {
        try {
          // if (!await this.associate_data_logic_event(component, data_data, 'insert')) return;
          const insert_result = await designer_data_data.insert_(data_data);
          component.$Message.success('insert data data success');
          // await component.trigger_engine(component, 'insert', insert_result);
          await component.init_table();
        } catch (e) {
          console.log(e.response.data);
          component.$Message.error(e.response.data);
        }
      },
      async update_(component, data_data) {
        try {
          // if (!await this.associate_data_logic_event(component, data_data, 'update')) return;
          await designer_data_data.update_(data_data);
          component.$Message.success('update data data success');
          await component.trigger_engine(component, 'update', data_data['id']);
          await component.init_table();
        } catch (e) {
          console.log(e.response.data);
          component.$Message.error(e.response.data);
        }
      },
      async delete_(component, data_data) {
        try {
          // if (!await this.associate_data_logic_event(component, data_data, 'delete')) return;
          await designer_data_data.delete_(data_data);
          component.$Message.success('delete data data success');
          await component.trigger_engine(component, 'delete', data_data['id']);
          await component.init_table();
        } catch (e) {
          console.log(e.response.data);
          component.$Message.error(e.response.data);
        }
      },
    },
    async created() {
      // await this.init_associate();
      await this.init_table_column();
      await this.init_table();
    }
  }
  // TODO bug: data operation need more check, there can be only operation at a time
  // TODO improvement: insert/update/delete data operation when across the multi data, so it also need refactor the backend code
</script>

<style>
  @import '../../../../../node_modules/view-design/dist/styles/iview.css';

  .ivu-split-trigger-vertical {
    width: 2px;
    background: #d6d6d6;
  }

  .ivu-split-trigger {
    border: 0px;
  }

  .ivu-tabs-bar {
    margin-bottom: 1px;
  }

  .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title {
    padding: 0 0px;
  }

  .ivu-breadcrumb {
    font-size: 22px;
    float: left;
  }

  .ivu-menu-horizontal {
    height: 30px;
    line-height: 30px;
  }
</style>
