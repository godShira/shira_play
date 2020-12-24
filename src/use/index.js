import BMap from 'BMap'

export const getAddressCoords = (id, keyword, cb) => {
  const map = new BMap.Map(id)
  const localSearch = new BMap.LocalSearch(map)
  localSearch.setSearchCompleteCallback(searchResult => {
    const poi = searchResult.getPoi(0)
    console.log(poi.point.lng + ',' + poi.point.lat)
    cb({ lng: poi.point.lng, lat: poi.point.lat })
  })
  localSearch.search(keyword)
}
