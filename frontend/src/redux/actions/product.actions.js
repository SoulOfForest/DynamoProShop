import { productConstants } from '../constants/product.constants';
import { alertConstants } from '../constants/alert.constants'
import { history } from '../../helpers/history'
import axios from '../../axios';

export const renderErrorResponse = (err) => {
    const { response } = err;
    
    if (response) {
        return {
            error: response.data.message
        }
    }

    return {
        error: err.message
    }
}

export const fetchProducts = (keyword = '', pageNumber = '') => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: productConstants.PRODUCTS_REQUEST });

            const { data } = await axios.get(`/api/products?q=${keyword}&page=${pageNumber}`);

            const { products, pages, page } = data;

            console.log(page, pages);
             
            dispatch({ type: productConstants.PRODUCTS_SUCCESS, payload: { products, pages, page } })
        } catch (err) {
            console.log(err);
            dispatch({ type: productConstants.PRODUCTS_FAIL, payload: renderErrorResponse(err) })
        }
    }
}

export const fetchTopProducts = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: productConstants.PRODUCT_TOP_REQUEST });

            const { data } = await axios.get(`/api/products/top`);

            dispatch({ type: productConstants.PRODUCT_TOP_SUCCESS, payload: { products: data } })
        } catch (err) {
            console.log(err);
            dispatch({ type: productConstants.PRODUCT_TOP_FAIL, payload: renderErrorResponse(err) })
        }
    }
}

export const deleteProduct = (productId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: productConstants.PRODUCT_DELETE_REQUEST
            });
            
            axios.defaults.withCredentials = true;
            await axios.delete(`/api/products/${productId}`);

            dispatch({
                type: productConstants.PRODUCT_DELETE_SUCCESS,
            });

            dispatch(fetchProducts());

            dispatch({ type: alertConstants.SUCCESS, payload: { message: '🐳 Delete Product Successful!' }}); 
        } catch (err) {
            console.error(err);
            dispatch({
                type: productConstants.PRODUCT_DELETE_FAIL,
                payload: renderErrorResponse(err)            
            })
        } 
    }
}

export const createProduct = (product) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: productConstants.PRODUCT_CREATE_REQUEST 
            });
            
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(`/api/products`, {});

            dispatch({
                type: productConstants.PRODUCT_CREATE_SUCCESS,
                payload: {
                    product: data
                }
            });

            history.push(`/admin/product/${data._id}/edit`);

            dispatch({ type: alertConstants.SUCCESS, payload: { message: '🐳 Create Product Successful!' }}); 
        } catch (err) {
            console.error(err);
            dispatch({
                type: productConstants.PRODUCT_CREATE_FAIL,
                payload: renderErrorResponse(err)            
            })
        } 
    }
}


export const updateProduct = (product) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: productConstants.PRODUCT_UPDATE_REQUEST
            });

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
            }         

            let uploadedImage = null;

            if (product.image !== getState().productDetail.detail.image) {
                const imageUploadConfig = {
                    headers: {
                        'Content-type': 'multipart/form-data'
                    }
                }

                const formData = new FormData();
                formData.append('image', product['image-file'][0]);
                formData.append('productId', product._id);

                const { data: imageUrl } = await axios.post('/api/upload', formData, imageUploadConfig);

                uploadedImage = imageUrl;
            }

            if (uploadedImage) product.image = uploadedImage;
            
            axios.defaults.withCredentials = true;
            await axios.put(`/api/products/${product._id}`, product, config);

            dispatch({
                type: productConstants.PRODUCT_UPDATE_SUCCESS
            });

            history.push(`/admin/productlist`);

            dispatch({ type: alertConstants.SUCCESS, payload: { message: '🐳 Update Product Successful!' }}); 
        } catch (err) {
            console.error(err);
            dispatch({
                type: productConstants.PRODUCT_UPDATE_FAIL,
                payload: renderErrorResponse(err)            
            });

            dispatch({
                type: alertConstants.WARNING,
                payload: {
                    message: renderErrorResponse(err).error
                }
            });
        } 
    }
}

export const fetchProductById = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: productConstants.PRODUCT_REQUEST });

            const { data } = await axios.get(`/api/products/${id}`);
             
            dispatch({ type: productConstants.PRODUCT_SUCCESS, payload: { product: data } })
        } catch (err) {
            console.log(err);
            dispatch({ type: productConstants.PRODUCT_FAIL, payload: renderErrorResponse(err) })
        }
    }
}

export const createProductReview = (productId, review) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: productConstants.PRODUCT_CREATE_REVIEW_REQUEST
            });

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
            }         
            
            axios.defaults.withCredentials = true;
            await axios.post(`/api/products/${productId}/reviews`, review, config);

            dispatch({
                type: productConstants.PRODUCT_CREATE_REVIEW_SUCCESS
            });

            dispatch(fetchProductById(productId));

            dispatch({ type: alertConstants.SUCCESS, payload: { message: '🐳 Review Product Successful!' }}); 
        } catch (err) {
            console.error(err);
            dispatch({
                type: productConstants.PRODUCT_CREATE_REVIEW_FAIL,
                payload: renderErrorResponse(err)            
            });
        } 
    }
}