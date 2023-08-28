"use client";
import { useState, useEffect, useMemo} from 'react'; 
import styles from './style.module.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { frmPrice } from '@/common/formatted/Price';
import { getUser, setUser ,IUser} from '@/redux/slices/userSlice'; 
import { addProductToCart } from '@/redux/slices/orderSlice'; 
import CButton from '@components/button/Button' 
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import Link from 'next/link';
import IconifyIcon from '@components/icon';
import { Product, ImageDetail } from '@/common/types/Product'
import { useRouter } from 'next/navigation'

import { getProductById } from '@/api/product.service';  
import { Response } from '@/common/types/Response' 
 
 
type ProductFormProps = {
    initialValues?: Product;
    onSubmit: (values: Product) => void;
    actionType: 'create' | 'edit';
};

const fileToImageDetail = (file: File): ImageDetail => ({
    name: file.name,
    lastModified: file.lastModified,
    lastModifiedDate: new Date(file.lastModified).toISOString(),
    webkitRelativePath: (file as any).webkitRelativePath || '',
    size: file.size,
    type: file.type
});


const ProductForm: React.FC<ProductFormProps> = ({ initialValues, onSubmit, actionType }) => {
    const [formValues, setFormValues] = useState<Product>(initialValues); 
    const [previewURL, setPreviewURL] = useState<string | null>(null);

    const title = {
        'create': 'Add Item',
        'edit':'Edit Item'
    }[actionType]
    
    // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.files && event.target.files.length > 0) {
    //         const file = event.target.files[0]; 
    
    //         const imageDetail = fileToImageDetail(file);
    
    //         setPreviewURL(URL.createObjectURL(file));
    
    //         setFormValues(prevValues => ({
    //             ...prevValues,
    //             image: imageDetail,
    //         }));
    //     }
    // };
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0]; 
            const reader = new FileReader(); 
            reader.onloadend = () => {
                const base64String = reader.result as string;  // Assert the result as a string
                setFormValues(prevValues => ({
                    ...prevValues,
                    image: base64String,
                }));
            };
    
            reader.readAsDataURL(file);
        }
    };
    
      

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault(); 
        onSubmit(formValues);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit} className={styles.card}>
            <span className={styles.gLabel}>
                <h1>{title}</h1>
            </span>
            <article className={styles.inputField}> 
                <div className={styles.gLabel}>
                    <span className={styles.gLabel}> Name:</span>
                    <label> 
                        <input type="text" name="product_name" value={formValues.product_name} onChange={handleChange} />
                    </label>
                </div>
                <div className={styles.gLabel}>
                    <span className={styles.gLabel}>Description:</span>
                    <label> 
                        <textarea className={styles.textarea} name="description" rows={5} value={formValues.description} onChange={handleChange}></textarea>
                    </label>
                </div>
                <div className={styles.gLabel}> 
                    <span className={styles.gLabel}>Quantity:</span>
                    <label>
                        <input type="number" name="quantity" value={formValues.quantity} onChange={handleChange} />
                    </label>
                </div>
                <div className={styles.gLabel}>
                    <span className={styles.gLabel}>Price:</span>
                    <label> 
                        <input type="number" name="price" value={formValues.price} onChange={handleChange} />
                    </label>
                </div> 
                <div className={styles.gLabel}>
                    <span className={styles.gLabel}>Image:</span>
                    
                    <label className={styles.customFileButton} htmlFor="fileInput">
                        <IconifyIcon icon="octicon:upload-16" color={'var(--primary-color)'} /> 
                        <span className={styles.nameUpFile}> Upload File</span>
                    </label>
                    <input 
                        id="fileInput"
                        className={styles.inputfile} 
                        type="file" 
                        name="image" 
                        onChange={handleFileChange} 
                    />
                    <div className={styles.previewImg}>
                        {(typeof formValues.image === 'string' && formValues.image != '') ? <img src={formValues.image} alt={`Product_${formValues?.product_id}`} /> : null}
                        {/* {previewURL ? <img src={previewURL} alt={`Product_${formValues?.product_id}`} /> : null} */}
                    </div>
                </div>
            </article>
            <footer className={styles.button}>
                <CButton style={{fontSize:'16px',color:'#fff'}} name={actionType === 'create' ? 'Create Product' : 'Update Product'} />   
            </footer>
        </form>
    );
};

export default ProductForm;
