export interface GridBot {
	params: BOTS.PositionParam;
	api: {
		id: string;
		name: string;
		type: string;
	};
	status: boolean;
	dateCreated: number;
	_id: string;
}

export as namespace HISTORY_BOTS;
