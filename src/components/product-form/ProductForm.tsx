"use client";
import { useState, useEffect, useMemo} from 'react'; 
import styles from './style.module.css'; 
import { frmPrice } from '@/common/formatted/Price';
import CButton from '@components/button/Button' 
import IconifyIcon from '@components/icon';
import { Product } from '@/common/types/Product'
 
 
type ProductFormProps = {
    initialValues?: Product;
    onSubmit: (values: Product) => void;
    actionType: 'create' | 'edit';
};
 

const ProductForm: React.FC<ProductFormProps> = ({ initialValues, onSubmit, actionType }) => {
    const [formValues, setFormValues] = useState<Product>(initialValues as Product); 
 
    const title = {
        'create': 'Add Item',
        'edit':'Edit Item'
    }[actionType]
     
    // const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.files && event.target.files.length > 0) {
    //         const file = event.target.files[0]; 
    //         const reader = new FileReader(); 
    //         reader.onloadend = () => {
    //             const base64String = reader.result as string;  // Assert the result as a string
    //             setFormValues(prevValues => ({
    //                 ...prevValues,
    //                 image: base64String,
    //             }));
    //         };
    
    //         reader.readAsDataURL(file);
    //     }
    // };
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            
            const image = new Image();
            image.src = URL.createObjectURL(file);
            image.onload = () => {
                // Set up a canvas with the desired dimensions
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Determine the new dimensions while maintaining the aspect ratio
                let { width, height } = image;
                if (width > height) {
                    if (width > 600) {
                        height *= 600 / width;
                        width = 600;
                    }
                } else {
                    if (height > 600) {
                        width *= 600 / height;
                        height = 600;
                    }
                }
    
                canvas.width = width;
                canvas.height = height;
                
                // Draw the image on the canvas
                ctx?.drawImage(image, 0, 0, width, height);
    
                // Get the data URL from the canvas
                const resizedDataURL = canvas.toDataURL(file.type);
    
                setFormValues(prevValues => ({
                    ...prevValues,
                    image: resizedDataURL,
                }));
            };
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
