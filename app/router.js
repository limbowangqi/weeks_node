'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.get('/', controller.home.index);
  router.get('/api/weeks/getBusinessList', controller.weeks.getBusinessList);
  router.get('/api/weeks/search', controller.weeks.search);
  router.get('/api/weeks/getPageList', controller.weeks.getPageList);
  router.get('/api/weeks/getEventList', controller.weeks.getEventList);
  router.post('/api/weeks/addPageInfo', controller.weeks.addPageInfos);
  router.post('/api/weeks/updatePageInfo', controller.weeks.updatePageInfo);
  router.post('/api/weeks/deletePageInfo', controller.weeks.deletePageInfo);
  router.post('/api/weeks/addEventInfos', controller.weeks.addEventInfos);
  router.post('/api/weeks/deleteEventInfo', controller.weeks.deleteEventInfo);
  router.post('/api/weeks/updateEventInfo', controller.weeks.updateEventInfo);
};
