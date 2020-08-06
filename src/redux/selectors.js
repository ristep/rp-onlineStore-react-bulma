// Navi selectors
export const getPage = (state) => (state.naviGator.page);
export const getNaviParams = (state) => (state.naviGator.params);

// UI state selectors
export const getSettingsDialogState = (state) => ( state.uiState.settingsDialogState );
export const getAboutDialogState = (state) => ( state.uiState.aboutDialogState );
export const getSidenavState = (state) => ( state.uiState.sidenavState );

// userToken Selectos
// export const getUserToken = (state) => (state.userToken); 

// data Selectors
export const getJsonData = (state) => (state.jsonData); 	
export const getFoodsAll = (state) => (state.jsonData.foodsAll); 	
export const getFoodDetail = (state) => (state.jsonData.foodDetail.data[0]); 	
export const getUserData = (state) => (state.jsonData.userData.data[0]); 	
export const getUserDataTouched = (state) => (state.jsonData.userData.dataTouched !== undefined); 	
export const getTouchedArr = (state) => (state.jsonData.userData.dataTouched); 	
export const getUpdData = (state) => (state.jsonData.userData.updData); 	
export const getPhotoList = (state) => (state.jsonData.photoList); 	

// data loading
export const getIsFetching = (state) => (state.jsonData.isFetching);
export const getLoadingClass = (state) => (state.jsonData.isFetching ? 'loading' : 'loaded');

// cartDataSet
export const getCartDataSet = (state) => (state.cartList);
export const getCartAmount = (state) => ( state.cartList.amount);
export const getCartItemCount = (state) => ( state.cartList.itemCount !== undefined );

export const getCartBoxState = (state) => ( state.uiState.cartBoxIsOpen);