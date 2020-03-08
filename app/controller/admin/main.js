const Controller = require('egg').Controller;

class MainController extends Controller{
    async checkLogin() {
        let userName = this.ctx.request.body.userName;
        let password = this.ctx.request.body.password;

        const sql =  " SELECT userName FROM admin_user WHERE userName = '"+userName +
        "' AND password = '"+password+"'"
        const result = await this.app.mysql.query(sql)

        if(result.length >0) {
            // 登录成功，进行session存储
            let openId = new Date().getTime();
            this.ctx.session.openId = {"openId":openId}
            this.ctx.body = {"code":1,"data":"登录成功","openId":openId}
        }else {
            this.ctx.body={code:0,data:'登录失败'}
        }
    }

    // 获取文章类型
    async getType() {
        const result = await this.app.mysql.select('type')

        this.ctx.body = {
            data:result
        }
    }

    async addArticle() {
        let article = this.ctx.request.body;
        const result = await this.app.mysql.insert("article",article);
        const insertSuccess = result.affectedRows === 1;
        const insertId = result.insertId;
        this.ctx.session.removeAttribute("openId")
        this.ctx.body = {
            isSuccess:insertSuccess,
            insertId:insertId
        }
    }

    async updateArticle() {
        let article = this.ctx.request.body;

        const result = await this.app.mysql.update("article",article);
        const updateSuccess = result.affectedRows === 1;

        this.ctx.body = {
            isSuccess:updateSuccess
        }
    }

    async getArticleList() {
        let sql = 'SELECT article.id as id,'+
                'article.title as title,'+
                'article.introduce as introduce,'+
                "article.addTime as addTime,"+
                'type.typeName as typeName '+
                'FROM article LEFT JOIN type ON article.type_id = type.Id '+
                'ORDER BY article.id DESC '
        let result = await this.app.mysql.query(sql)
        this.ctx.body = {data:result}
    }
    
    async delArticle() {
        let id = this.ctx.params.id

        const result = await this.app.mysql.delete("article",{"id":id})

        this.ctx.body = {
            data:result
        }
    }

    async getArticleById() {
        let id = this.ctx.params.id

        let sql = 'SELECT article.id as id,'+
        'article.title as title,'+
        'article.introduce as introduce,'+
        'article.article_content as article_content,'+
        "article.addTime as addTime,"+
        'article.view_count as view_count ,'+
        'type.typeName as typeName ,'+
        'type.id as typeId '+
        'FROM article LEFT JOIN type ON article.type_id = type.Id '+
        'WHERE article.id='+id

        const result = await this.app.mysql.query(sql)

        this.ctx.body = {
            data:result
        }
    }
}

module.exports = MainController