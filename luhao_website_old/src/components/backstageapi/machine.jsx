import Axios from "axios"

export function machineInfo(id, props) {
  if (!!props) {
    return Axios({
      method: "get",
      url:
        "/test_official_web_server/data/machine_info?lan=" +
        props +
        "&machine_id=" +
        id,
    }).catch(error => {
      return { ok: false, status: -1, error: error }
    })
  } else {
    return Axios({
      method: "get",
      url: "/test_official_web_server/data/machine_info?machine_id=" + id,
    }).catch(error => {
      return { ok: false, status: -1, error: error }
    })
  }
}
export const machineList = props => {
  if (props) {
    return Axios({
      method: "get",
      url: "/test_official_web_server/data/machine_list?lan=" + props,
    }).catch(error => {
      return { ok: false, status: -1, error: error }
    })
  } 
  else {
    return Axios({
      method: "get",
      url: "/test_official_web_server/data/machine_list",
    }).catch(error => {
      return { ok: false, status: -1, error: error }
    })
  }
}