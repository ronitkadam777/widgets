import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NgGridConfig, NgGridItemConfig, NgGridItemEvent, NgGrid } from "angular2-grid";
import { metaDataInfo } from 'app/data/metaData';

interface Box {
    id: number;
    config: NgGridItemConfig;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
    @ViewChild(NgGrid)
    private grid: NgGrid;
    public curNum: number = 6;
    public boxes: Array<any> = [];
    public gridConfig: NgGridConfig = <NgGridConfig>{
        'margins': [10],            //  The size of the margins of each item. Supports up to four values in the same way as CSS margins. Can be updated using setMargins()
        'draggable': true,          //  Whether the items can be dragged. Can be updated using enableDrag()/disableDrag()
        'resizable': true,          //  Whether the items can be resized. Can be updated using enableResize()/disableResize()
        'max_cols': 4,              //  The maximum number of columns allowed. Set to 0 for infinite. Cannot be used with max_rows
        'visible_cols': 0,          //  The number of columns shown on screen when auto_resize is set to true. Set to 0 to not auto_resize. Will be overriden by max_cols
        'visible_rows': 0,          //  The number of rows shown on screen when auto_resize is set to true. Set to 0 to not auto_resize. Will be overriden by max_rows
        'min_cols': 0,              //  The minimum number of columns allowed. Can be any number greater than or equal to 1.
        'min_rows': 0,              //  The minimum number of rows allowed. Can be any number greater than or equal to 1.
        'col_width': 350,           //  The width of each column
        'row_height': 350,          //  The height of each row
        'cascade': 'left',            //  The direction to cascade grid items ('up', 'right', 'down', 'left')
        'min_width': 100,           //  The minimum width of an item. If greater than col_width, this will update the value of min_cols
        'min_height': 100,          //  The minimum height of an item. If greater than row_height, this will update the value of min_rows
        'fix_to_grid': false,       //  Fix all item movements to the grid
        'auto_style': true,         //  Automatically add required element styles at run-time
        'auto_resize': false,       //  Automatically set col_width/row_height so that max_cols/max_rows fills the screen. Only has effect is max_cols or max_rows is set
        'maintain_ratio': false,    //  Attempts to maintain aspect ratio based on the colWidth/rowHeight values set in the config
        'prefer_new': false,        //  When adding new items, will use that items position ahead of existing items
        'limit_to_screen': false,   //  When resizing the screen, with this true and auto_resize false, the grid will re-arrange to fit the screen size. Please note, at present this only works with cascade direction up.
        'center_to_screen': false,  //  When resizing the screen, with this true and limit_to_screen true, the grid will center itself to the screen if max columns width is smaller than the grid width.
     }
    private rgb: string = '#efefef';
    private curItemCheck: number = 0;
    private itemPositions: Array<any> = [];

    constructor() {
        
        for (let i = 0; i < metaDataInfo.length; i++) {
            const conf = this._generateDefaultItemConfig();
            conf.payload = i;
            this.boxes[i] = { id: i, config: conf, metaData: metaDataInfo[i]};
        }
    }

    get ratioDisabled(): boolean {
        return (this.gridConfig.max_rows > 0 && this.gridConfig.visible_cols > 0) ||
            (this.gridConfig.max_cols > 0 && this.gridConfig.visible_rows > 0) ||
            (this.gridConfig.visible_cols > 0 && this.gridConfig.visible_rows > 0);
    }

    get itemCheck(): number {
        return this.curItemCheck;
    }

    set itemCheck(v: number) {
        console.log(v);
        this.curItemCheck = v;
    }

    get curItem(): NgGridItemConfig {
        return this.boxes[this.curItemCheck] ? this.boxes[this.curItemCheck].config : {};
    }

    ngAfterViewInit(): void {
        //  Do something with NgGrid instance here
    }

    setMargin(marginSize: string): void {
        this.gridConfig.margins = [ parseInt(marginSize, 10) ];
    }

    addBox(): void {
        const conf: NgGridItemConfig = this._generateDefaultItemConfig();
        conf.payload = this.curNum++;
        this.boxes.push({ id: conf.payload, config: conf });
    }

    removeBox(): void {
        if (this.boxes[this.curItemCheck]) {
            this.boxes.splice(this.curItemCheck, 1);
        }
    }

    updateItem(index: number, event: NgGridItemEvent): void {
        // Do something here
    }

    onDrag(index: number, event: NgGridItemEvent): void {
        // Do something here
    }

    onResize(index: number, event: NgGridItemEvent): void {
        // Do something here
    }

    public randomise(): void {
        for (const box of this.boxes) {
            box.config.col = Math.floor(Math.random() * 6) + 1;
            box.config.row = 1;
        }
    }

    private _generateDefaultItemConfig(): NgGridItemConfig {
        return {
            'col': 1,               //  The start column for the item
            'row': 1,               //  The start row for the item
            'sizex': 1,             //  The start width in terms of columns for the item
            'sizey': 1,             //  The start height in terms of rows for the item
            'dragHandle': null,     //  The selector to be used for the drag handle. If null, uses the whole item
            'resizeHandle': null,   //  The selector to be used for the resize handle. If null, uses 'borderSize' pixels from the right for horizontal resize,
                                    //    'borderSize' pixels from the bottom for vertical, and the square in the corner bottom-right for both
            'borderSize': 15,
            'fixed': false,         //  If the grid item should be cascaded or not. If yes, manual movement is required
            'draggable': true,      //  If the grid item can be dragged. If this or the global setting is set to false, the item cannot be dragged.
            'resizable': true,      //  If the grid item can be resized. If this or the global setting is set to false, the item cannot be resized.
            'payload': null,        //  An optional custom payload (string/number/object) to be used to identify the item for serialization
            'maxCols': 0,           //  The maximum number of columns for a particular item. This value will only override the value from the grid (if set) if it is smaller
            'minCols': 0,           //  The minimum number of columns for a particular item. This value will only override the value from the grid if larger
            'maxRows': 0,           //  The maximum number of rows for a particular item. This value will only override the value from the grid (if set) if it is smaller
            'minRows': 0,           //  The minimum number of rows for a particular item. This value will only override the value from the grid if larger
            'minWidth': 0,          //  The minimum width of a particular item. This value will override the value from the grid, as well as the minimum columns if the resulting size is larger
            'minHeight': 0,         //  The minimum height of a particular item. This value will override the value from the grid, as well as the minimum rows if the resulting size is larger
        };
    }

}
