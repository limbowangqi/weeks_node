'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  async getBusinessList() {
    const businessList = await this.app.mysql.select('business_info');
    return businessList;
  }

  async search() {
    const businessList = await this.app.mysql.select('business_info');
    return businessList;
  }

  async getPageList(businessId) {
    const businessList = await this.app.mysql.select('pages_info', {
      where: { businessId },
    });
    return businessList;
  }

  async getEventList(businessId, pageId) {
    const businessList = await this.app.mysql.select('events_info', {
      where: { businessId, pageId },
    });
    return businessList;
  }

  async addPageInfos(businessId, params) {
    const rows = params && params.map(item => {
      return {
        eventId: item.pageIdValue,
        desc: item.pageDescValue,
        businessId,
      };
    });

    const result = await this.app.mysql.insert('pages_info', rows);
    return result.affectedRows === params.length;
  }

  async updatePageInfo(businessId, pageId, pageDesc) {
    const row = {
      desc: pageDesc,
    };

    const options = {
      where: {
        businessId, eventId: pageId,
      },
    };

    const result = await this.app.mysql.update('pages_info', row, options);
    return result.affectedRows !== 1;
  }

  async deletePageInfo(businessId, pageId) {
    const page_result = await this.app.mysql.delete('pages_info', {
      businessId,
      eventId: pageId,
    });
    await this.app.mysql.delete('events_info', {
      businessId,
      eventId: pageId,
    });
    return page_result.affectedRows !== 0;
  }

  async addEventInfos(businessId, pageId, params) {
    const rows = params && params.map(item => {
      return {
        businessId,
        pageId,
        eventId: item.eventIdValue,
        desc: item.eventDescValue,
        extra: item.eventExtraValue,
      };
    });

    const result = await this.app.mysql.insert('events_info', rows);
    return result.affectedRows === params.length;
  }


  async deleteEventInfo(businessId, pageId, eventId) {
    const page_result = await this.app.mysql.delete('events_info', {
      businessId,
      pageId,
      eventId,
    });
    return page_result.affectedRows !== 0;
  }

  async updateEventInfo(businessId, pageId, eventId, desc, extra) {
    const row = {
      desc,
      extra,
    };

    const options = {
      where: {
        businessId, pageId, eventId,
      },
    };

    const result = await this.app.mysql.update('events_info', row, options);
    return result.affectedRows !== 0;
  }
}

module.exports = HomeService;
