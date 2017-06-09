FROM elixir:latest
ADD . /code
WORKDIR /code
RUN ls -al
RUN apt-get update
RUN apt-get install -y netcat
RUN mix local.hex --force
RUN mix local.rebar --force
RUN mix deps.get
RUN mix compile
RUN chmod +x ./startup.sh
CMD ["./startup.sh"]
