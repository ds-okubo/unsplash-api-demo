import { createApi } from 'unsplash-js';

const ACCESS_KEY = 'ここに Unsplash API の Access Key';

export default (req, res) => {
  return new Promise(resolve => {
    const { query: { _, keyword } } = req;
    const unsplash = createApi({ accessKey: ACCESS_KEY });
    unsplash.search.getPhotos({
      query: keyword,
      perPage: 15
    }).then(data => {
      const { results } = data.response;
      // ダウンロードエンドポイントの呼び出し処理
      // 有効化するとすぐ Demo のリクエスト上限(50req/1h) に達してしまうので、暫定的にコメントアウト
      // if(data.type === 'success' && results.length > 0) {
      //   results.map(r => {
      //     unsplash.photos.trackDownload({
      //       downloadLocation: r.links.download_location + `&client_id=${ACCESS_KEY}`
      //     });
      //   });
      // }
      const _results = results.map(r => ({
        author: r.user.name,
        profileurl: r.user.links.html,
        small: r.urls.small,
        regular: r.urls.regular
      }));
      res.json({ results: _results });
      return resolve('end');
    })
  })
}
