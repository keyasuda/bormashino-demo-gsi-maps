require 'cgi'
require 'js'

# GSI API call module
module GsiApi
  def self.address_search(query, _callback_to, _options)
    response = JS.global.fetch("https://msearch.gsi.go.jp/address-search/AddressSearch?q=#{CGI.escape(query)}").await
    JSON.parse(response.text.await.to_s)
  end
end
