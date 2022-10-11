require 'cgi'
require 'bormashino/fetch'

# GSI API call module
module GsiApi
  def self.address_search(query, callback_to, options)
    Bormashino::Fetch.new(
      resource: "https://msearch.gsi.go.jp/address-search/AddressSearch?q=#{CGI.escape(query)}",
      resolved_to: callback_to,
      options:,
    ).run
  end
end
