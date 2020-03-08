'use strict';
const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index(){
        let result = await this.app.mysql.get("blog_content",{})
        this.ctx.body = result
    }

    async getArticleList() {
        let sql = 'SELECT article.id as id,'+
                'article.title as title,'+
                'article.introduce as introduce,'+
                'article.addTime as addTime,'+
                'article.view_count as view_count ,'+
                '.type.typeName as typeName '+
                'FROM article LEFT JOIN type ON article.type_id = type.Id'
        const result = await this.app.mysql.query(sql);
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

    async getType() {
        const result = await this.app.mysql.select('type')

        this.ctx.body = {
            data:result
        }
    }
}

module.exports = HomeController