//获取学生列表
const getStudent = {
    data(){ 
        return{
            pageNum: 1,
            pageSize: 5,
            tableData: [],
            totalStu: 0,
            loading:false
        }
    },
    created(){
        this.getStudent()
      },
    methods:{
        // 获取学生列表
        getStudent() {
        this.$http
          .get("/student/list", {
            params: {
              pageNum: this.pageNum,
              pageSize: this.pageSize,
            },
          })
          .then((res) => {
            this.loading = true
            setTimeout(()=>{
              if(res.data.code==200){
                this.totalStu = res.data.msg.count;
                this.tableData = res.data.msg.rows;
              }
              
              this.loading = false
            },3000) 
          });
      },
    }
}
//获取教师列表
const getTeacher = {
    data(){
        return{
            pageNum: 1,
            pageSize: 5,
            tableData: [],
            totalTea: 0
        }
    }, 
    created(){
        this.getTeacher()
      },
    methods:{
        
        // 获取教师列表
        getTeacher() {
        this.$http
          .get("/teacher/list", {
            params: {
              pageNum: this.pageNum,
              pageSize: this.pageSize,
            }
          })
          .then((res) => {
            this.totalTea = res.data.msg.count;
            this.tableData = res.data.msg.rows;
          });
      },
      // 添加教师
    }
}
//获取学生选课列表
const getTopic = {
    data(){
        return{
            stuTopicList: [],
            totalTopic: 0,
        }
    },
    methods:{
        // 获取选题列表
        getTopic(data) {
        const params = data
        this.$http
          .get("/stutopic/list", {params})
          .then((res) => {
            this.totalTopic = res.data.msg.count;
            this.stuTopicList = res.data.msg.rows;
          });
      },

    }
}
//获取提交论文信息
const getThesis={
  data() {
    return {
      thesisArray: [],
      thesisCount: 0,
    };
  },
  created() {
    this.isOffer();
  },
  methods: {
    //获取提交论文信息
    isOffer() {
      this.$http
        .get("thesis/list", {
          params: {
            pageSize: 5,
            pageNum: 1,
            tutor: localStorage.getItem("teaName"),
          },
        })
        .then((res) => {
          this.thesisArray = res.data.msg.rows;
          this.thesisCount=res.data.msg.count
        });
    },
  },
}
export {getStudent,getTeacher,getTopic,getThesis}