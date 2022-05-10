import L, { Icon } from 'leaflet'
import 'leaflet-extra-markers'

export const showMap = (container, app) => {
  // Leafletの初期化
  const map = L.map(container)
  L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
    attribution:
      "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
  }).addTo(map)
  map.setView([35, 135], 5)
  const markerLayer = L.layerGroup().addTo(map)

  // Ruby appが画面を更新した(=地点一覧が更新された)ら地図を更新する
  app.addEventListener('bormashino:updated', (e) => {
    markerLayer.clearLayers()

    // ul > li からマーカーを生成する
    const markers = Array.from(e.target.querySelectorAll('li')).map((li, i) => {
      const g = JSON.parse(li.dataset.geometry)
      let color = 'blue'
      if (li.className == 'selected') color = 'red'
      return L.marker(g.coordinates.reverse(), {
        icon: L.ExtraMarkers.icon({
          icon: 'fa-number',
          number: i + 1,
          markerColor: color,
        }),
      }).addTo(markerLayer)
    })

    const selected = e.target.querySelector('li.selected')
    if (selected) {
      // 選択された地点があればその位置に移動
      const g = JSON.parse(selected.dataset.geometry)
      map.setView(g.coordinates.reverse(), 15)
    } else {
      // 全体が見えるように
      const group = L.featureGroup(markers)
      map.fitBounds(group.getBounds())
    }
  })
}
