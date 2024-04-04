"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const fs_1 = __importDefault(require("fs"));
const NEWEST_VERSION = "4.5.4";
const CURRENT_VERSION = '4.5.3';
const BUCKET_ACCESS_KEY_ID = "";
const BUCKET_SECRET_ACCESS_KEY = "";
const BUCKET_NAME = "vivid-icons-prod";
const BUCKET_BASE_FOLDER = "3f7739a0-a898-4f69-a82b-ad9d743170b6";
const FOLDER_PATH = "./icons";
const BASE_URL = 'https://icon.resources.vonage.com';
figma.showUI(__html__);
const ROW_SIZE = 20;
figma.ui.onmessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (msg.type === 'add-icons') {
        // Remove all existing nodes
        figma.currentPage.children.forEach(node => {
            if (node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'INSTANCE') {
                node.remove();
            }
        });
        const svgsJson = yield loadManifest();
        const categorizedIcons = categorizeIconsByCategory(svgsJson);
        const categories = Object.keys(categorizedIcons);
        let lastFramePosition = 0;
        // Add icons to frames
        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            const categoryNode = createCategoryFrame(category, lastFramePosition);
            const icons = categorizedIcons[category];
            let count = 0;
            for (let j = 0; j < icons.length; j++) {
                const icon = icons[j];
                const svgJson = yield loadSvgs(icon.id);
                try {
                    const svg = figma.createNodeFromSvg(svgJson);
                    svg.name = replaceSuffix(icon.id);
                    svg.x = 50 * count + 10;
                    svg.y = 50 * Math.floor(j / ROW_SIZE) + 10;
                    if (count >= ROW_SIZE - 1) {
                        count = 0;
                        categoryNode.resize(categoryNode.width, categoryNode.height + 50);
                    }
                    else {
                        count++;
                    }
                    lastFramePosition = categoryNode.y + categoryNode.height;
                    const component = figma.createComponentFromNode(svg);
                    component.description = 'keyword: ' + icon.keyword.join(', ');
                    categoryNode.appendChild(component);
                }
                catch (e) {
                    console.error(icon.id + ' failed to load');
                }
            }
            console.log(category + ' category loaded -> ' + (i + 1) + ' of ' + categories.length + ' categories');
        }
        console.log('All categories loaded!!!!');
        // Upload the icons to S3
        uploadIconsToS3()
            .then(() => {
            console.log('Icons uploaded to S3 successfully');
        })
            .catch((error) => {
            console.error('Error uploading icons to S3:', error);
        });
        figma.closePlugin();
    }
    ;
});
function createCategoryFrame(category, lastFramePosition) {
    // Create frames for each category
    const categoryNode = figma.createFrame();
    categoryNode.name = category;
    categoryNode.resize(1000, 50);
    categoryNode.cornerRadius = 8;
    categoryNode.y = lastFramePosition + 50;
    figma.currentPage.appendChild(categoryNode);
    return categoryNode;
}
function replaceSuffix(str) {
    const pattern = /-(solid|line|mono|color)$/;
    if (pattern.test(str)) {
        // Replace the last "-" before the suffix with "/"
        return str.replace(/-(solid|line|mono|color)$/, '/$1');
    }
    else {
        return str;
    }
}
// Categorize icons
function categorizeIconsByCategory(icons) {
    const categorizedIcons = {};
    categorizedIcons['uncategorized'] = [];
    icons.forEach(icon => {
        var _a;
        const category = (_a = icon.tag.find((tag) => tag.startsWith('category_'))) === null || _a === void 0 ? void 0 : _a.substring(9);
        if (category) {
            if (!categorizedIcons[category]) {
                categorizedIcons[category] = [];
            }
            categorizedIcons[category].push(icon);
        }
        else {
            categorizedIcons['uncategorized'].push(icon);
        }
    });
    return categorizedIcons;
}
// Load svgs from json
function loadSvgs(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${BASE_URL}/v${CURRENT_VERSION}/${name}.svg`);
            return yield response.text();
        }
        catch (e) {
            console.error('failed to load svg' + e);
            return '';
        }
    });
}
function loadManifest() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${BASE_URL}/v${CURRENT_VERSION}/manifest.json`);
            return response.json();
        }
        catch (e) {
            console.error('error loading the manifest', e);
            figma.closePlugin();
            return;
        }
    });
}
function uploadIconsToS3() {
    return __awaiter(this, void 0, void 0, function* () {
        const s3 = new aws_sdk_1.default.S3({
            accessKeyId: BUCKET_ACCESS_KEY_ID,
            secretAccessKey: BUCKET_SECRET_ACCESS_KEY
        });
        // Upload the icons folder to S3
        const uploadParams = {
            Bucket: `${BUCKET_BASE_FOLDER}/${BUCKET_NAME}`,
            Key: `icons/v${NEWEST_VERSION}`,
            Body: fs_1.default.createReadStream(`${FOLDER_PATH}/${NEWEST_VERSION}`),
        };
        yield s3.upload(uploadParams).promise();
    });
}
