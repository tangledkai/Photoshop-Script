///////////////////////////// [TangleKai]/////////////////////////////
// Photoshop LayertoGroup
// by tangledkai_2.0
//安裝步驟：
// 1. 將腳本放置於 <Photoshop 目錄>\presets\scripts
// 2. 重新啟動 Photoshop
// 3. 選擇 File -> Scripts -> Corner Editor

function isGroup(layer) {
    return layer.typename === "LayerSet";
}

function groupSelectedLayers() {
    var doc = app.activeDocument;
    var selectedLayers = getSelectedLayers();

    if (selectedLayers.length === 0) {
        alert("請選擇至少一個圖層。");
        return;
    }

    for (var i = 0; i < selectedLayers.length; i++) {
        var layer = selectedLayers[i];
        if (!isGroup(layer)) {
            var groupName = layer.name;
            var newGroup = doc.layerSets.add();
            newGroup.name = groupName;
            try {
                layer.move(newGroup, ElementPlacement.INSIDE);
            } catch (e) {
                newGroup.remove();
            }
        }
    }
}

function getSelectedLayers() {
    var selectedLayers = [];
    var ref = new ActionReference();
    ref.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    var desc = executeActionGet(ref);

    if (desc.hasKey(stringIDToTypeID("targetLayers"))) {
        var layersList = desc.getList(stringIDToTypeID("targetLayers"));
        var doc = app.activeDocument;

        for (var i = 0; i < layersList.count; i++) {
            try {
                var layerIndex = layersList.getReference(i).getIndex();
                var layerRef = new ActionReference();
                layerRef.putIndex(charIDToTypeID("Lyr "), layerIndex + 1); 
                var layerDesc = executeActionGet(layerRef);
                var layerID = layerDesc.getInteger(stringIDToTypeID("layerID"));
                var layer = getLayerByID(layerID, doc);
                if (layer) {
                    selectedLayers.push(layer);
                }
            } catch (e) {
                continue;
            }
        }
    } else {
        if (doc.activeLayer) {
            selectedLayers.push(doc.activeLayer);
        }
    }
    return selectedLayers;
}

function getLayerByID(id, doc) {
    function searchLayers(layers) {
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].id === id) {
                return layers[i];
            }
            if (isGroup(layers[i])) {
                var found = searchLayers(layers[i].layers);
                if (found) return found;
            }
        }
        return null;
    }

    var layer = searchLayers(doc.layers); 
    return layer;
}

groupSelectedLayers();
///////////////////////////// [TangleKai]/////////////////////////////
