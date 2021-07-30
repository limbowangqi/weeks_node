'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {


  responseSuccess(data) {
    return JSON.stringify({
      success: true,
      data,
    });
  }

  responseFail(msg) {
    return JSON.stringify({
      SUCCESS: false,
      msg,
    });
  }

  async getBusinessList() {
    const { ctx } = this;
    const businessList = await ctx.service.weeks.getBusinessList();
    ctx.response.body = this.responseSuccess(businessList);
  }

  async search() {
    const { ctx } = this;
    let key = ctx.query.key;
    if (key.length !== 15 && key.length !== 12) {
      ctx.response.body = this.responseFail('不合法的关键字');
      return;
    }
    if (key.length === 15) {
      key = key.substring(3, 15);
    }

    const businessId = key.substring(0, 4);
    const pageId = key.substring(4, 8);
    const eventId = key.substring(8, 12);
    const pageList = await ctx.service.weeks.searchPage(businessId, pageId);
    const eventList = await ctx.service.weeks.searchEvent(businessId, pageId, eventId);

    ctx.response.body = this.responseSuccess({
      businessId, pageId, pageList, eventList,
    });
  }

  async getPageList() {
    const { ctx } = this;
    const businessId = ctx.query.businessId;
    const pageList = await ctx.service.weeks.getPageList(businessId);
    ctx.response.body = this.responseSuccess(pageList);
  }

  async getEventList() {
    const { ctx } = this;
    const businessId = ctx.query.businessId;
    const pageId = ctx.query.pageId;
    const pageList = await ctx.service.weeks.getEventList(businessId, pageId);
    ctx.response.body = this.responseSuccess(pageList);
  }

  async addPageInfos() {
    const { ctx } = this;

    const businessId = ctx.request.body.businessId;
    const params = ctx.request.body.params;
    // 需要判断id是否重复
    const pageList = await ctx.service.weeks.getPageList(businessId);
    if (pageList && pageList.length !== 0 && params && params.length !== 0) {
      for (let i = 0; i < pageList.length; i++) {
        for (let j = 0; j < params.length; j++) {
          if (pageList[i].eventId === params[j].pageIdValue) {
            ctx.response.body = this.responseFail('存在相同的页面ID');
            return;
          }
        }
      }
    }

    const result = await ctx.service.weeks.addPageInfos(businessId, params);
    if (result) {
      ctx.response.body = this.responseSuccess(result);
    } else {
      ctx.response.body = this.responseFail('系统错误');
    }
  }

  async updatePageInfo() {
    const { ctx } = this;

    const businessId = ctx.request.body.businessId;
    const pageId = ctx.request.body.pageId;
    const pageDesc = ctx.request.body.pageDesc;
    const result = await ctx.service.weeks.updatePageInfo(businessId, pageId, pageDesc);
    if (result) {
      ctx.response.body = this.responseSuccess(result);
    } else {
      ctx.response.body = this.responseFail('系统错误');
    }
  }

  async deletePageInfo() {
    const { ctx } = this;

    const businessId = ctx.request.body.businessId;
    const pageId = ctx.request.body.pageId;
    const result = await ctx.service.weeks.deletePageInfo(businessId, pageId);
    if (result) {
      ctx.response.body = this.responseSuccess(result);
    } else {
      ctx.response.body = this.responseFail('系统错误');
    }
  }

  async addEventInfos() {
    const { ctx } = this;

    const businessId = ctx.request.body.businessId;
    const pageId = ctx.request.body.pageId;
    const params = ctx.request.body.params;

    // 判断id是否重复
    const eventList = await ctx.service.weeks.getEventList(businessId, pageId);
    if (eventList && eventList.length !== 0 && params && params.length !== 0) {
      for (let i = 0; i < eventList.length; i++) {
        for (let j = 0; j < params.length; j++) {
          if (eventList[i].eventId === params[j].eventIdValue) {
            ctx.response.body = this.responseFail('存在相同的事件ID');
            return;
          }
        }
      }
    }

    const result = await ctx.service.weeks.addEventInfos(businessId, pageId, params);
    if (result) {
      ctx.response.body = this.responseSuccess(result);
    } else {
      ctx.response.body = this.responseFail('系统错误');
    }
  }

  async deleteEventInfo() {
    const { ctx } = this;

    const businessId = ctx.request.body.businessId;
    const pageId = ctx.request.body.pageId;
    const eventId = ctx.request.body.eventId;

    const result = await ctx.service.weeks.deleteEventInfo(businessId, pageId, eventId);
    if (result) {
      ctx.response.body = this.responseSuccess(result);
    } else {
      ctx.response.body = this.responseFail('系统错误');
    }
  }

  async updateEventInfo() {
    const { ctx } = this;

    const businessId = ctx.request.body.businessId;
    const pageId = ctx.request.body.pageId;
    const eventId = ctx.request.body.eventId;
    const desc = ctx.request.body.desc;
    const extra = ctx.request.body.extra;

    const result = await ctx.service.weeks.updateEventInfo(businessId, pageId, eventId, desc, extra);
    if (result) {
      ctx.response.body = this.responseSuccess(result);
    } else {
      ctx.response.body = this.responseFail('系统错误');
    }
  }
}

module.exports = HomeController;
