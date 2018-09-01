import nodes from './nodes.js'

for (let node of nodes) {
    axios.get(`http://${node.ip}/stats?filter=last_1_days&verbose=true`, {
        headers: {
            auth: node.pw.toLowerCase()
        }
    }).then(res => {
        let child = document.createElement('tr')
        let nodeData = res.data.nodeData
        child.innerHTML = `
                    <td>${node.ip}</td>
                    <td>${nodeData.node.tnt_addr}</td>
                    <td>Con Fails: ${nodeData.node.consecutive_fails}</td>
                    <td>Con Passes: ${nodeData.node.consecutive_passes}</td>
                    <td>TNT: ${nodeData.audits[0].tnt_balance_grains / Math.pow(10, 8)}</td>
            `
        document.getElementById('nodes-table-body').appendChild(child)
    })
}
