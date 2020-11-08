<template>
  <div style="border:1px solid #dcdfe6;margin-top: 15px">
    <i-form :label-width=200>
      <row v-for="(data_struct_value, data_struct_key) in data_struct">
        <form-item :label="data_struct_value" :prop="data_struct_key">
          <i-input v-model="data_data[data_struct_key]"></i-input>
        </form-item>
      </row>
    </i-form>
  </div>
</template>

<script>
   // TODO 支持设置是否缓存本地, 当缓存到本地时自动缓存数据到本地, 需要传递business_id和is_cache_2_local
    import designer_data_struct from "@/views/operate/designer/designer_data/designer_data_struct/designer_data_struct";
    import designer_data_data from "@/views/operate/operate/databoard/data_board_data";

    export default {
        name: "ExternalEmbedOperate", // 外嵌操作台
        props: {
            directory_id: { // 数据目录的id
                default: null,
                type: Number,
            },
            directory_name: { // 数据目录的名称
                default: null,
                type: String,
            },
            input_data_id: { // 数据id
                default: null,
                type: Number,
            },
            change_callback: { // 变更数据时的回调函数
                default: null,
                type: Function
            }
        },
        data() {
            return {
                data_struct: {}, // 数据结构 {key: value}
                data_data: {}, // 数据数据 {key: value}
                data_id: null,
            }
        },
        methods: {
            async init_data_struct() { // 初始化数据结构
                try {
                    let new_data_struct = {};
                    const data_struct_list = await designer_data_struct.select_({'did': this.directory_id});
                    if (data_struct_list < 1) {
                        return;
                    }
                    for (const item of data_struct_list) {
                        new_data_struct[item["code"]] = item["meaning"];
                    }
                    this.data_struct = new_data_struct;
                    this.$Message.success('query data struct success');
                } catch (e) {
                    console.log(e);
                    this.$Message.error(e.response.data);
                }
            },
            async init_data_data() { // 初始化数据数据
                if (this.data_id == null) return;
                try {
                    const request_data = {
                        page_current: 1,
                        page_size: 1,
                        search: {'did': this.directory_id, 'id': this.data_id},
                    };
                    const resp_data = await designer_data_data.select_(request_data);
                    this.data_data = resp_data['data'][0];
                    this.$Message.success('query data data success');
                } catch (e) {
                    console.log(e);
                    this.$Message.error(e.response.data);
                }
            },
            async change_data_data() { // 变更
                // 通过判断 data_id是否为空判断是新增数据还是修改数据
                this.data_data['did'] = this.directory_id;
                const component = this;

                async function insert_data() { // 插入数据
                    let result = null;
                    try {
                        result = await designer_data_data.insert_(component.data_data); // return the insert result's id
                        component.$Message.success('insert data data success');
                    } catch (e) {
                        console.log(e.response.data);
                        component.$Message.error(e.response.data);
                    }
                    return result;
                }

                async function update_data() { // 修改数据
                    try {
                        await designer_data_data.update_(component.data_data);
                        component.$Message.success('update data data success');
                    } catch (e) {
                        console.log(e.response.data);
                        component.$Message.error(e.response.data);
                    }
                }

                if (this.data_id == null) {
                    this.data_id = await insert_data();
                } else {
                    await update_data();
                }
                await this.init_data_data();
                if (this.change_callback != null) {
                    this.change_callback(this._data); // 调用回调并传递当前组件内的数据
                }
                return this.data_id;
            }
        },
        async created() {
            this.data_id = this.input_data_id;
            await this.init_data_struct();
            await this.init_data_data();
        }
    }
</script>

<style scoped>

</style>
