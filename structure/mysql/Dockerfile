FROM mysql:8.0

ARG TZ=Europe/Moscow
ENV TZ ${TZ}
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

#RUN chmod 0444 /etc/mysql/conf.d/*.cnf
#
#RUN mkdir -p /var/log/mysql && \
#    chown -R root /var/log/mysql

RUN chown -R mysql:mysql /var/lib/mysql

VOLUME /var/lib/mysql

USER mysql

CMD ["mysqld"]

EXPOSE 3306
