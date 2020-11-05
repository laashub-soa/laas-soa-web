<template>
  <div>
    <i-form :label-width=200>
      <row v-for="(data_struct_value, data_struct_key) in data_struct">
        <form-item :label="data_struct_value" :prop="data_struct_key">
          <i-input v-model="data_data[data_struct_key]"></i-input>
        </form-item>
      </row>
      <row>
        <i-button type="primary" long @click="" v-if="change_callback==null">提交</i-button>
      </row>
    </i-form>
  </div>
</template>

<script>
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
            data_id: { // 数据id
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
            }
        },
        methods: {
            async init_data_struct() { // 初始化数据结构
                try {
                    let new_data_struct = {}
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
        },
        async created() {
            await this.init_data_struct();
            await this.init_data_data();
        }
    }
</script>

<style scoped>

</style>
