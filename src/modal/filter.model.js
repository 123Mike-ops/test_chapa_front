 export class FilterField {
    constructor() {
        this.subCategory = null;
        this.category = null;
        this.city = null;
        this.priceFrom = null;
        this.priceTo = null;
        this.region = null;
        this.search = null;
        this.page = 0;
        this.userId = null;
        this.pageSize=10;
        this.sortBy = "create_time";
        this.sortType = "DESC";
    }
}