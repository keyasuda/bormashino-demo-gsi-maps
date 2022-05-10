import L, { Icon } from 'leaflet'
delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

export const showMap = (container, app) => {
  const map = L.map(container)
  L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
    attribution:
      "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
  }).addTo(map)
  map.setView([35, 135], 5)
  const markerLayer = L.layerGroup().addTo(map)

  app.addEventListener('bormashino:updated', (e) => {
    markerLayer.clearLayers()

    const markers = Array.from(e.target.querySelectorAll('li')).map((li) => {
      const g = JSON.parse(li.dataset.geometry)
      return L.marker(g.coordinates.reverse()).addTo(markerLayer)
    })

    const group = L.featureGroup(markers)
    map.fitBounds(group.getBounds())
  })
}
