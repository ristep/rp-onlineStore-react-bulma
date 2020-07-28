import { useSelector } from "react-redux";

// userToken Selectos selector Hooks
export const useUserToken = () => useSelector( (state) => (state.userToken) ); 
export const useAuToken = () => useSelector( (state) => (state.userToken.tokenData.auToken) );
export const useUsersAll = () => useSelector( (state) => (state.jsonData.usersAll));
export const useCardBoxOpen = () => useSelector( (state) => (state.uiState.cartBoxIsOpen));

export const useUserTitles = () => {
	return useSelector((state) => (
		state.userToken.tokenData !== undefined
			?
			{
				userId: state.userToken.tokenData.id,
				userName: state.userToken.tokenData.name,
				userEMail: state.userToken.tokenData.email,
				userRole: state.userToken.tokenData.role,
				firstName: state.userToken.tokenData.first_name,
				secondName: state.userToken.tokenData.second_name,
			}
			: {}
	));
}

export const useIsLoggedIn = () => {
	return useSelector((state) => (
		state.userToken.isValid &&
		state.userToken.tokenData !== undefined &&
		state.userToken.tokenData.name !== 'anonymous'
	));
}

export const usePassDialogState = () => {
	return useSelector((state) => (state.uiState.passDialogState))
};