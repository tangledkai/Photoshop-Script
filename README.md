# **[TangledKai]-Photoshop-Script**

### **[TangledKai]_FolderImport**
_____
* Features
  * Create a new PSD document, allowing specification of width, height, and resolution.
  * Select a folder to import resources, supporting jpg, jpeg, png, tiff, gif, and bmp formats.
  * Layer names in PS are named after the file names.

* 功能
  * 新建一個新的PSD文件，可制定寬度、高度、解析度。
  * 選擇導入資源的文件夾，可支持jpg、jpeg、png、tiff、gif、bmp格式。
  * PS中的圖層名稱或以來源文件的名稱命名圖層。


### **[TangledKai]_GroupOutput**
_____
* Features
  * In Photoshop, exclude subgroups and the outermost group, then perform batch export to (PNG, JPG, PSD).
  * Exported files are named after their respective group names and saved in the same folder as the original PSD file.
  * When saving as PNG and JPG, metadata is removed to reduce file size.
  * When exporting as PSD, only the selected groups are preserved.

* 功能
  * 在Photoshop中排除子群組將最外層的群組，進行批次輸出成(PNG、JPG、PSD)。
  * 導出的文件以相應的組別名稱命名，文件會保存在原始PSD文件相同的資料夾中。
  * 儲存成PNG與JPG時會去除中繼資料以減少檔案大小。
  * 輸出PSD時只會保留所選的群組。

[Tutorial Video](https://youtu.be/J-9lOpz-Ffc?si=B1NEliNRpJGDHPDC)


### **[TangledKai]_LayertoGroup**
_____
* Features
  * Batch convert selected layers into groups, naming the selected groups to match their corresponding layers.
  * When using the script, select at least two layers. If groups already exist, the layers to be grouped must be below the existing groups, otherwise the order will be incorrect.

* 功能
  * 將選取的圖層批次轉成群組，將選取的群組命名與圖層一致。
  * 使用腳本時至少選取兩個圖層，當已經有群組時，要群組的圖層必須在群組下方否則排序會有錯誤。


### **[TangledKai]_RenameLayerGroups**
_____
* Features
  * Allow users to input a new name, and the script will rename all groups according to the selected mode.
  * Users choose the renaming mode (suffix, prefix, replace, name sorting).
    * Suffix → Name → Name_A
    * Prefix → Name → A_Name
    * Replace → Name → AAAA
    * Name sorting → Name001, Name002, Name003
  * When renaming, layers are excluded and only parent-level groups are renamed, designed to work with GroupOutput.
  * Groups that should not be renamed can be placed in sublevels of other groups.

* 功能
  * 讓使用者輸入新名稱，腳本會依據所選模式重命名所有群組。
  * 用戶選擇重命名模式（字尾、字首、替換、名稱排序）。
    * 字尾 → Name → Name_A
    * 字首 → Name → A_Name
    * 替換 → Name → AAAA
    * 名稱排序 → Name001、Name002、Name003
  * 重新命名時會排除圖層只重新命名父層級的群組，搭配GroupOutput使用。
  * 不想要被命名的群組可以放在群組的子層級。
 

### **[TangledKai]_ReverseLayerOrder**
_____
* Features
  * Reverse the order of multiple layers at once in Photoshop, used for the order when exporting layers to files or naming layers.
* 功能
  * 在Photoshop中一次性反轉多個圖層的順序，用於圖層轉存成檔案或圖層命名時的順序。

### **Kai_PsAction.atn**
_____
* Features
  * Here is the action set for Photoshop. It is more convenient to use after importing the script and then importing the action set..
* 功能
  * PS的動作集，腳本導入後再導入動作集比較方便使用。

![image](https://github.com/user-attachments/assets/8d7e4585-7902-4099-838f-ff09cb49c36b)

### Instructions:
_____
Move "[TangledKai]_ReverseLayerOrder.jsx" to "/Presets/Scripts/" in the Photoshop directory.

The next time Photoshop is opened, you can run the script from File->Scripts->[TangledKai]_ReverseLayerOrder.

### Support:
_____
Supported versions: Adobe Photoshop 14.0 to 22.1.0.
