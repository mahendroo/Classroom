import { isAndroid } from "../globalFunctions";

const primary_font = "Arial";
const secondary_font = "Gotham";

export const fonts = {
	primary_regular_font: isAndroid() ? primary_font : primary_font,
	primary_semi_bold_font: isAndroid() ? primary_font : primary_font,
	primary_bold_font: isAndroid() ? primary_font : primary_font,
	primary_medium_font: isAndroid() ? primary_font : primary_font,

	secondary_regular_font: isAndroid() ? secondary_font : secondary_font,
	secondary_semi_bold_font: isAndroid() ? secondary_font : secondary_font,
	secondary_bold_font: isAndroid() ? secondary_font : secondary_font,
	secondary_medium_font: isAndroid() ? secondary_font : secondary_font,
};

export const fontSize = {
	title_size: 22,
	subtitle_size: 18,
	header_title_size: 28,
	form_title_size: 24,
	form_sub_title_size: 20,
	input_title_size: 18,
	input_content_size: 16,
	app_version_size: 12,
};
