"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ElementTransformer;
function ElementTransformer(input) {
    switch (input.length) {
        case 5:
        case 11:
            return [null, null, null, null, ...input];
        case 7:
        case 13:
            return [null, null, ...input];
        case 9:
        case 15:
        default:
            return input;
    }
}
//https://docs.google.com/spreadsheets/d/19WPv7zVyA8XqmZLR6VdMF4XepK8DL07b3dCsfpvLRIQ/edit?usp=sharing
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWxlbWVudFRyYW5zZm9ybWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvc3RvY2stdHJhZGVyL0VsZW1lbnRUcmFuc2Zvcm1lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7QUFFZCxxQ0FlQztBQWZELFNBQXdCLGtCQUFrQixDQUFDLEtBQVk7SUFDdEQsUUFBUSxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdEIsS0FBSyxDQUFDLENBQUM7UUFDUCxLQUFLLEVBQUU7WUFDTixPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFFM0MsS0FBSyxDQUFDLENBQUM7UUFDUCxLQUFLLEVBQUU7WUFDTixPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBRS9CLEtBQUssQ0FBQyxDQUFDO1FBQ1AsS0FBSyxFQUFFLENBQUM7UUFDUjtZQUNDLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztBQUNGLENBQUM7QUFFRCxzR0FBc0ciLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGZvcm1hdCAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRWxlbWVudFRyYW5zZm9ybWVyKGlucHV0OiBhbnlbXSkge1xyXG5cdHN3aXRjaCAoaW5wdXQubGVuZ3RoKSB7XHJcblx0XHRjYXNlIDU6XHJcblx0XHRjYXNlIDExOlxyXG5cdFx0XHRyZXR1cm4gW251bGwsIG51bGwsIG51bGwsIG51bGwsIC4uLmlucHV0XTtcclxuXHJcblx0XHRjYXNlIDc6XHJcblx0XHRjYXNlIDEzOlxyXG5cdFx0XHRyZXR1cm4gW251bGwsIG51bGwsIC4uLmlucHV0XTtcclxuXHJcblx0XHRjYXNlIDk6XHJcblx0XHRjYXNlIDE1OlxyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0cmV0dXJuIGlucHV0O1xyXG5cdH1cclxufVxyXG5cclxuLy9odHRwczovL2RvY3MuZ29vZ2xlLmNvbS9zcHJlYWRzaGVldHMvZC8xOVdQdjd6VnlBOFhxbVpMUjZWZE1GNFhlcEs4REwwN2IzZENzZnB2TFJJUS9lZGl0P3VzcD1zaGFyaW5nXHJcbiJdfQ==