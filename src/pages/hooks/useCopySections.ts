import { useState } from "react";
import type { RangeMessages } from "@/lib/validation";

export type SectionId = "sixM" | "threeM" | "j" | "p";

export type CopySectionDef = {
	id: SectionId;
	label: string;
	columnIndex: number;
	decimal: boolean;
	messages: RangeMessages;
};

export type CopySectionState = {
	first: string;
	last: string;
	value: string;
};

export const COPY_SECTIONS: readonly CopySectionDef[] = [
	{
		id: "sixM",
		label: "6 METER",
		columnIndex: 1,
		decimal: false,
		messages: {
			emptyValue: "6M支数不能为空",
			emptyNumber: "6M号码不能为空",
			zeroNumber: "6M 号码不能为0， 要大于等于1",
			lastLessThanFirst: (first) => `第二个号码少过${first}`,
			lastGreaterThanMax: (maxNum) => `第二个号码不能大于${maxNum}`,
		},
	},
	{
		id: "threeM",
		label: "3 METER",
		columnIndex: 2,
		decimal: false,
		messages: {
			emptyValue: "3M支数不能为空",
			emptyNumber: "3M号码不能为空",
			zeroNumber: "3M 号码不能为0， 要大于等于1",
			lastLessThanFirst: (first) => `第二个号码少过${first}`,
			lastGreaterThanMax: (maxNum) => `第二个号码不能大于${maxNum}`,
		},
	},
	{
		id: "j",
		label: "JOINT",
		columnIndex: 3,
		decimal: false,
		messages: {
			emptyValue: "Joint支数不能为空",
			emptyNumber: "JOINT号码不能为空",
			zeroNumber: "JOINT号码不能为0， 要大于等于1",
			lastLessThanFirst: (first) => `第二个号码少过${first}`,
			lastGreaterThanMax: (maxNum) => `第二个号码不能大于${maxNum}`,
		},
	},
	{
		id: "p",
		label: "PENETRATION",
		columnIndex: 4,
		decimal: true,
		messages: {
			emptyValue: "PENETRATION支数不能为空",
			emptyNumber: "PENETRATION号码不能为空",
			zeroNumber: "PENETRATION 号码不能为0， 要大于等于1",
			lastLessThanFirst: (first) => `第二个号码少过${first}`,
			lastGreaterThanMax: (maxNum) => `第二个号码不能大于${maxNum}`,
		},
	},
] as const;

const INTEGER_REGEX = /^\d*$/;
const DECIMAL_REGEX = /^\d*\.?\d{0,2}$/;

const emptyState = (): CopySectionState => ({ first: "", last: "", value: "" });

const initialState = (): Record<SectionId, CopySectionState> => ({
	sixM: emptyState(),
	threeM: emptyState(),
	j: emptyState(),
	p: emptyState(),
});

export type SectionField = "first" | "last" | "value";

export function useCopySections() {
	const [state, setState] =
		useState<Record<SectionId, CopySectionState>>(initialState);

	const setField = (id: SectionId, field: SectionField, raw: string) => {
		if (field === "value") {
			const decimal = COPY_SECTIONS.find((s) => s.id === id)?.decimal ?? false;
			const regex = decimal ? DECIMAL_REGEX : INTEGER_REGEX;
			if (!regex.test(raw)) return;
		}
		setState((prev) => ({ ...prev, [id]: { ...prev[id], [field]: raw } }));
	};

	return { sections: COPY_SECTIONS, state, setField };
}
