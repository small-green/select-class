//获取论文课题列表
const topicMixin = {
    data(){
        return{
            totalRow:0,
            tableData:[],
            Url:[],
            topicList:[],
            msgList:[],
            queryInfo:{
              pageNum:1,
              pageSize:5,
              username: localStorage.getItem("stuNum"),
            }
        }
    },
    // methods:{
    //     getTopicList(data,isFlag) {
    //       const params = data
    //         this.$http
    //           .get("/topic/list", {
    //             params
    //           })
    //           .then((res) => {
    //             this.totalRow = res.data.msg.count;
    //             this.tableData = res.data.msg.rows;
    //             this.Url = res.data.msg.rows.fuJian;
    //           });
    //       },
    // }
    methods:{
      getTopicList(params) {
          this.$http
            .get("/topic/list", {
              params:params
            })
            .then((res) => {
              this.totalRow = res.data.msg.count;
              this.tableData = res.data.msg.rows;
              this.Url = res.data.msg.rows.fuJian;
            });
        },
  }
}
//登录之后，凭id查信息
const getInfo = {
  data(){
    return{
      id:0,
      data:[],
    }
  },
  created(){
    this.id = localStorage.getItem("stuId");
    this.id = parseInt(this.id);
  },
  methods:{
    //用id查信息
    getInfo() {
      this.$http
        .get("student/list", {
          params: {
            pageNum: 1,
            pageSize: 1,
            id: this.id,
          },
        })
        .then((res) => {
          if(res.data.code==200){
            this.data = res.data.msg.rows[0];
          }
          this.loading = false
        });
    },
  }
}
//获取该学生选的课程
const stuTopic = {
  data(){
    return{
      Data2: [],
      title:"",
      stuId:""
    }
  },
  created(){
    this.stuId = localStorage.getItem("stuNum")
  },
  methods:{
    getTitle() {
      //去选课列表找是否该学生选课了
      this.$http.get("/stutopic/list",{
        params:{
          pageNum:1,
          pageSize:1,
          stuNum:this.stuId
        }
      }).then((res2)=>{
        if(res2.data.msg.count){
          this.$http
          .get("/topic/list", {
            params: {
              pageNum: 1,
              pageSize: 5,
              name: res2.data.msg.rows[0].name,
            },
          })
          .then((res) => {
            this.Data2 = res.data.msg.rows[0];
            localStorage.setItem("titleInfo",res.data.msg.rows[0].name)
            localStorage.setItem("finishDate",res.data.msg.rows[0].finishDate)
          });
        }else{
          this.Data2 = 0
        }
      })
     
    },
  }
}
//增加学生
const addStudent = {
  data(){
    return{
      Form: {
        username: "",
        number: "",
        password: "",
      },
    };
    
  },
  methods:{
// 添加学生
add() {
  const data = {
    number: this.Form.number,
    username: this.Form.username,
    password: this.Form.password,
  };
  this.$refs.Ref.validate((val) => {
    if (!val) {
      return 0;
    } else {
      this.$http.post("/student/register", data).then((res) => {
        console.log(res);
        if (res.data.code == 202) {
          this.dialogVisible = true;
          this.$message.error("该学号的学生已经存在了");
        } else if (res.data.code == 200) {
          this.dialogVisible = false;
          this.$message.success("新增成功了");
        }
      });
    }
  });
},
  }

}
//登录之后，凭id查看教师信息
const getTeahcerInfo = {
  data(){
    return{
      squareUrl: "",
      form: {},
    }
  },
  created(){
    this.getTeacher()
  },
  methods:{
// 获取该教师信息
getTeacher() {
  this.$http
    .get("/teacher/list", {
      params: {
        pageNum: 1,
        pageSize: 1,
        id: localStorage.getItem("teaId"),
      },
    })
    .then((res) => {
      this.squareUrl = res.data.msg.rows[0].imgUrl;
      this.form = res.data.msg.rows[0]
    });
},
  }
}
//赖加载
const loading = {
  data(){
    return{
      //懒加载
      fullscreenLoading:false,
  }
},
methods:{
  loading() {
    this.fullscreenLoading = true;
    setTimeout(() => {
      this.fullscreenLoading = false;
    }, 1000);
    setTimeout(() => {
      this.$message.success("操作成功");
    }, 1000);
  },
}
}
export{topicMixin,getInfo,stuTopic,addStudent,getTeahcerInfo,loading}