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

    <!--数据区域-->
    <row>
      <i-col :span="data_tree_area_percent" v-if="data_tree_area_percent!='0'"><!--数据树-->
        数据树
      </i-col>
      <i-col :span="data_data_area_percent" v-if="data_data_area_percent!='0'">
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

      </i-col>
    </row>
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
        data_tree_area_percent: 0,
        data_data_area_percent: 24,
        is_have_delete_associate_column: false, // 是否剔除过 标记为关联模型的列
        is_have_delete_data_type_is_array_column: false, //是否剔除过 data_type不为string的列
        data_struct: [],
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
        }
        , data_tree: {
          keys: [],
          values: [],
        }
      }
    },
    methods: {
      async init_table_column() {
        await component_table.cancel_opt_data(this);
        this._data.loading = true;
        try {
          const data_struct_list = await designer_data_struct.select_({'did': this.directory_id});
          this._data.data_struct = data_struct_list;
          if (data_struct_list < 1) {
            this._data.loading = false;
            return;
          }
          // basic column
          for (const data_struct of data_struct_list) {
            // 剔除 标记为关联模型的列
            if (data_struct["reference_type"] != "") {
              this._data.is_have_delete_associate_column = true;
              continue;
            }
            // 剔除data_type不为string的列
            if (data_struct["data_type"] != "string") {
              this._data.is_have_delete_data_type_is_array_column = true;
              continue;
            }
            const code = data_struct["code"];
            const meaning = data_struct["meaning"];
            this._data.default_values[code] = data_struct["default_value"];
            this._data.column_keys.push(code);
            this._data.columns.push(component_table.editable_table_common_column(this, meaning, code));
            this._data.search.template.push({"label": meaning, "prop": code, "v_model": ""});
          }
          if (this._data.is_have_delete_data_type_is_array_column) {
            this._data.data_tree_area_percent += 12;
            this._data.data_data_area_percent -= 12;
          }
          if (this._data.columns.length > 0) {
            // id
            this._data.column_keys = ["id"].concat(this._data.column_keys);
            this._data.columns = [{
              title: 'id',
              key: 'id',
              width: 50
            }].concat(this._data.columns);
            // operation column
            if (!this.is_open_data) {
              this._data.columns.push(component_table.editable_table_common_operation_column(this));
            }
          } else {
            // 隐藏 数据区域
            this._data.data_tree_area_percent += 12;
            this._data.data_data_area_percent -= 12;
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
        } catch (e) {
          console.log(e);
          this.$Message.error(e.response.data);
        } finally {
          this._data.loading = false;
        }
      },
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
          await component.init_table();
        } catch (e) {
          console.log(e.response.data);
          component.$Message.error(e.response.data);
        }
      }
      , async init_data_tree() { // 初始化数据树
        if (!this._data.is_have_delete_data_type_is_array_column) return;
        const tree_data = [];
        for (let data_struct_item of this._data.data_struct) {
          let data_type = data_struct_item["data_type"];
          if (data_type == "string") continue;
          if (data_type = "list_string") {
            for (let data_item of this._data.data) {

            }

          }
        }
      }
    },
    async created() {
      await this.init_table_column();
      await this.init_table();
      await this.init_data_tree();
    }
  }
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
