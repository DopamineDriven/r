import React, { FC, useMemo } from 'react';
import { ThemeProvider } from 'next-themes';

export interface State {
	displayModal: boolean;
	modalView: string;
}

const initialState: State = {
	displayModal: false,
	modalView: 'IMAGE'
};

type Action =
	| {
			type: 'OPEN_MODAL';
	  }
	| {
			type: 'CLOSE_MODAL';
	  }
	| {
			type: 'SET_MODAL_VIEW';
			view: MODAL_VIEWS;
	  };

type MODAL_VIEWS = 'IMAGE' | 'VIDEO';

export const GlobalContext = React.createContext<State | any>(
	initialState
);

GlobalContext.displayName = 'SnooContext';

function globalReducer(state: State, action: Action) {
	switch (action.type) {
		case 'OPEN_MODAL': {
			return {
				...state,
				displayModal: true,
				displaySidebar: false
			};
		}
		case 'CLOSE_MODAL': {
			return {
				...state,
				displayModal: false
			};
		}
		case 'SET_MODAL_VIEW': {
			return {
				...state,
				modalView: action.view
			};
		}
	}
}

export const GlobalProvider: FC = props => {
	const [state, dispatch] = React.useReducer(
		globalReducer,
		initialState
	);

	const openModal = () => dispatch({ type: 'OPEN_MODAL' });
	const closeModal = () => dispatch({ type: 'CLOSE_MODAL' });

	const setModalView = (view: MODAL_VIEWS) =>
		dispatch({ type: 'SET_MODAL_VIEW', view });

	const value = useMemo(
		() => ({
			...state,
			openModal,
			closeModal,
			setModalView
		}),
		[state]
	);
	return <GlobalContext.Provider value={value} {...props} />;
};

export const useGlobal = () => {
	const context = React.useContext(GlobalContext);
	if (context === undefined) {
		throw new Error(
			'GlobalContext must be consumed within a Provider'
		);
	}
	return context;
};

export const ManagedGlobalContext: FC = ({ children }) => {
	return (
		<GlobalProvider>
			<ThemeProvider>{children}</ThemeProvider>
		</GlobalProvider>
	);
};
