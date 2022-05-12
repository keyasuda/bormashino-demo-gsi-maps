require 'sinatra/base'
require 'bormashino/local_storage'
require 'json/pure'
require_relative './gsi_api'

class App < Sinatra::Base
  set :protection, false

  before do
    @cache = Bormashino::SessionStorage.instance
  end

  # クエリパラメータ
  # q=検索クエリ文字列
  # p=強調表示すべき地点のindex
  get '/' do
    @loading = false
    if params[:q] && !@cache.get_item(params[:q])
      # 地理院の地名検索API呼び出しをリクエスト
      GsiApi.address_search(params[:q], '/address_callback', params)
      @loading = true
    end
    @pois =
      if params['q']
        JSON.parse(@cache.get_item(params['q']) || '[]')
      else
        []
      end

    erb :index
  end

  # 地名検索APIの結果が返ってきたら呼び出されるエンドポイント
  post '/address_callback' do
    options = JSON.parse(params[:options])
    @cache.set_item(options['q'], params[:payload])

    redirect to("/?q=#{CGI.escape(options['q'])}")
  end
end
