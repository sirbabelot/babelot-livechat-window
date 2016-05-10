const APP_PATH = '/home/deploy/app'

module.exports = function (shipit) {
  shipit.initConfig({
    staging: {
      servers: 'deploy@162.243.218.96',
      key:'./tmp_keys/key'
    }
  });

  shipit.task('deploy', function () {
    return shipit.remote(`
        cd ${APP_PATH} &&
          docker-compose -f docker-compose.yml -f docker-compose.prod.yml stop &&
          echo "y" | docker-compose -f docker-compose.yml -f docker-compose.prod.yml rm --all &&
          docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull &&
          docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
      `)
  });
};

