function Container() {
    this.id = '';
    this.className = '';
    this.htmlCode = '';
    this.src = '';
    this.alt = '';
}
 Container.prototype.render = function() {
    return this.htmlCode;
};
 function Gallery(myId, myClass, myItems, mySrc, myAlt) {
    Container.call(this);
    this.id = myId;
    this.className = myClass;
    this.items = myItems;
    this.src = mySrc;
    this.alt = myAlt;
}
 Gallery.prototype = Object.create(Container.prototype);
 Gallery.prototype.constructor = Gallery;
 Gallery.prototype.render = function() {
    let res = '<div class="' + this.className + '">';
     for (let item in this.items) {
        if (this.items[item] instanceof GalleryItem) {
            res += this.items[item].render();
        }
    }
    res += '</div>';
    return res;
};
 function GalleryItem(myId, myClass, myItems, mySrc, myAlt) {
    Container.call(this);
    this.id = myId;
    this.className = myClass;
    this.items = myItems;
    this.src = mySrc;
    this.alt = myAlt;
}
 GalleryItem.prototype = Object.create(Container.prototype);
 GalleryItem.prototype.constructor = GalleryItem;
 GalleryItem.prototype.render = function() {
    return '<a href="' + this.src + '" target="_blank">'
        + '<img src="' + this.src + '" alt="' + this.alt + '" class="' + this.className + '"></a>';
};