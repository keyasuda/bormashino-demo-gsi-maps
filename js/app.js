import { RubyApplication } from 'bormashino'
import rubyDigest from './ruby-digest.js'
import { showMap } from './map.js'

const main = async () => {
  showMap('map', document.querySelector('#bormashino-application'))

  const vm = await RubyApplication.initVm('/ruby.' + rubyDigest + '.wasm', [
    'ruby.wasm',
    '-I/stub',
    '-I/gem/lib',
    '-EUTF-8',
    '-e_=0',
  ])

  vm.printVersion()
  vm.eval(`require_relative '/src/bootstrap.rb'`)

  const currentPath = () => location.href.replace(location.origin, '')
  RubyApplication.request('get', currentPath())
  RubyApplication.mount()

  window.bormashino = RubyApplication
}

main()
