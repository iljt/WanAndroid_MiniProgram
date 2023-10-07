//require() 返回的是module.exports 而不是exports。
//通过require 引入模块，返回模块通过 module.exports 或 exports 暴露的接口。
// 引入模块 baseApi.js 引入模块的路径只能是相对路径
const baseApi = require('./baseApi.js');

// 首页banner --- https://www.wanandroid.com/banner/json
/**
 * //写法一：
      let banner = () => baseApi.request('GET',"/banner/json");
   //写法二 调用时不能试用.then方法
      let banner = function(){
      baseApi.request('GET',"/banner/json");
}
 */
let banner = () => baseApi.request('GET',"/banner/json");
// 首页文章列表 --- // 使用 `（键盘数字1旁边的符号）可以用 ${} 标记出变量 --- https://www.wanandroid.com/article/list/0/json
let  articleList= (pageNum) =>  baseApi.request('GET',`/article/list/${pageNum}/json`);

// 项目分类 --- https://www.wanandroid.com/project/tree/json
let projectCategory = () =>  baseApi.request('GET',"/project/tree/json");

// 最新项目 --- https://www.wanandroid.com/article/listproject/0/json
let newProject = (pageNum) => baseApi.request("GET", `/article/listproject/${pageNum}/json`);

// 项目列表数据 --- https://www.wanandroid.com/project/list/1/json?cid=294
let projectListData = (pageNum, param) => baseApi.request("GET", `/project/list/${pageNum}/json`, param);

// 注册 --- https://www.wanandroid.com/user/register 参数：username,password,repassword
let register = (param) => baseApi.request("POST", '/user/register', param);

// 登录 --- https://www.wanandroid.com/user/login 参数：username，password
let login = (param) => baseApi.request("POST", '/user/login', param);

// 退出登录 --- https://www.wanandroid.com/user/logout/json
let unlogin = () => baseApi.request("GET", '/user/logout/json');

// 收藏文章列表 --- https://www.wanandroid.com/lg/collect/list/0/json 参数： 页码：拼接在链接中，从0开始。
let collectList = (pageNum) => baseApi.request("GET", `/lg/collect/list/${pageNum}/json`);

// 收藏页取消收藏 --- https://www.wanandroid.com/lg/uncollect/2805/json 参数：id: 拼接在链接上 originId: 列表页下发，无则为-1
let uncollect = (id, param) => baseApi.request("POST", `/lg/uncollect/${id}/json`, param);

// 文章列表取消收藏 --- https://www.wanandroid.com/lg/uncollect_originId/2333/json 参数：id: 拼接在链接上
let articleUncollect = (id) => baseApi.request("POST", `/lg/uncollect_originId/${id}/json`);

// 收藏文章 --- https://www.wanandroid.com/lg/collect/1165/json 参数：文章id，拼接在链接中。
let collect = (id) => baseApi.request("POST", `/lg/collect/${id}/json`);

// 导航 --- https://www.wanandroid.com/navi/json
let navi = () => baseApi.request("GET", '/navi/json');

// 常用网站 --- https://www.wanandroid.com/friend/json
let friend = () => baseApi.request("GET", '/friend/json');

// 搜索 --- https://www.wanandroid.com/article/query/0/json 参数：页码：拼接在链接上，从0开始。k ： 搜索关键词
let search = (pageNum, param) => baseApi.request("POST", `/article/query/${pageNum}/json`, param);

// 搜索热词 --- https://www.wanandroid.com/hotkey/json
let hotkey = () => baseApi.request("GET", '/hotkey/json');

// 体系数据 --- https://www.wanandroid.com/tree/json
let tree = () => baseApi.request("GET", '/tree/json');

// 知识体系下的文章 --- https://www.wanandroid.com/article/list/0/json?cid=60 参数：cid 分类的id，上述二级目录的id 页码：拼接在链接上，从0开始。
let treeArticle = (pageNum,cid,param) => baseApi.request("GET", `/article/list/${pageNum}/json?cid=${cid}`, param);

// 暴露接口
module.exports = {
  banner,
  articleList,
  projectCategory,
  newProject,
  projectListData,
  register,
  login,
  unlogin,
  collectList,
  uncollect,
  articleUncollect,
  collect,
  navi,
  friend,
  search,
  hotkey,
  tree,
  treeArticle
}

