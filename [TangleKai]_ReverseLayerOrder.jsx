///////////////////////////// [TangleKai]/////////////////////////////
//改變photoshop中的圖層順序

// 選擇當前文檔
var doc = app.activeDocument;

// 反轉圖層順序
reverseLayerOrder();

function reverseLayerOrder() {
    var layers = [];
    // 收集所有圖層到一個陣列
    for (var i = 0; i < doc.layers.length; i++) {
        layers.push(doc.layers[i]);
    }

    // 將收集到的圖層反向排序
    for (var j = 0; j < layers.length; j++) {
        // 將每個圖層移動到圖層堆疊的頂部
        layers[j].move(doc, ElementPlacement.PLACEATBEGINNING);
    }
}

///////////////////////////// [TangleKai]/////////////////////////////