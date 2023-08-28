"use client";
import { useState, useEffect, useMemo} from 'react'; 
import styles from './style.module.css'; 
import { frmPrice } from '@/common/formatted/Price';
import CButton from '@components/button/Button' 
import IconifyIcon from '@components/icon';
import { User, LogIn } from '@/common/types/Auth'
import { validatePassword } from '@/common/validate/password'
import Link from 'next/link';

type AuthenticatorFormProps = {
    initialValues?: User;
    onSubmit?: (values: User) => void;
    actionType: 'login' | 'signup';
};
  
const AuthenticatorForm: React.FC<AuthenticatorFormProps> = ({ initialValues, onSubmit, actionType }) => {
    const [formValues, setFormValues] = useState<User>(initialValues as User); 
    const [isPdpsAgreed, setIsPdpsAgreed] = useState<boolean>(false);
    const [isRememberMeAgreed, setIsRememberMeAgreed] = useState<boolean>(false);
    
    const [passwordValidation, setPasswordValidation] = useState({
        hasUpperCase: false,
        hasLowerCase: false,
        hasDigit: false,
        hasSpecialChar: false,
        hasMinLength: false
    });
    const [isConfirmPasswordMatching, setIsConfirmPasswordMatching] = useState(true);
    const validConditionsCount = Object.values(passwordValidation).filter(Boolean).length;
    const progressBarWidth = (validConditionsCount / 5) * 100;
  
    const title = {
        'login': 'Log In',
        'signup':'Sign Up'
    }[actionType]
     
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
                    if (width > 300) {
                        height *= 300 / width;
                        width = 300;
                    }
                } else {
                    if (height > 300) {
                        width *= 300 / height;
                        height = 300;
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
        if(actionType === 'signup' && !isPdpsAgreed) {
            alert("Please agree to the Terms of Use and Privacy Policy.");
            return;
        }else{
            formValues.isPdpa = isPdpsAgreed;
        }
        if(actionType === 'login'){
            formValues.isRememberMe = isRememberMeAgreed;
        }
        onSubmit && onSubmit(formValues);
    };
    

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
    
        if (actionType === 'signup') {
            if (name === 'password') {
                const validationResults = validatePassword(value);
                setPasswordValidation(validationResults);
            } else if (name === 'confirm_password') {
                setIsConfirmPasswordMatching(value === formValues.password);
            }
        }
    
        setFormValues(prev => ({ ...prev, [name]: value }));
    };
     
    return (
        <form onSubmit={handleSubmit} className={styles.card}>
            <span className={styles.inputField}>
                <h1>{title}</h1>
            </span>
            <article className={styles.inputField}> 
                <div className={styles.gLabel}>
                    <span className={styles.gLabel}> Username</span>
                    <label> 
                        <input type="text" name="username" value={formValues.username} onChange={handleChange} />
                    </label>
                </div> 
                <div className={styles.gLabel}> 
                    <span className={styles.gLabel}>Password</span>
                    <label>
                        <input type="password" name="password" value={formValues.password} onChange={handleChange} />
                    </label>
                    {actionType === 'signup' && (
                        <div className={styles.passwordRequirements}>
                            <div className={styles.progressBarContainer}>
                                <div className={styles.progressBar} style={{ width: `${progressBarWidth}%` }}></div>
                            </div>
                        </div>
                    )}
                </div> 
                {actionType === 'signup' ? (
                    <>
                        <div className={styles.gLabel}> 
                            <span className={styles.gLabel}>Confirm Password</span>
                            <label>
                                <input type="password" name="confirm_password" value={formValues.confirm_password} onChange={handleChange} />
                            </label>
                            {isConfirmPasswordMatching ? 
                                <span className={styles.confirmMatch}>✓ Passwords match</span> : 
                                <span className={styles.confirmMismatch}>✗ Passwords do not match</span>}
                        </div> 
                        <div className={styles.gCheckbox}>
                            <div className={styles.checkbox}>
                                <input style={{width:'1.2rem',left:2}} type="checkbox" checked={passwordValidation.hasUpperCase} readOnly />
                                <h6>Contains an uppercase letter (A-Z)</h6>
                            </div>
                            <div className={styles.checkbox}>
                                <input style={{width:'1.2rem'}}  type="checkbox" checked={passwordValidation.hasLowerCase} readOnly />
                                <h6> Contains a lowercase letter (a-z)</h6>
                            </div>
                            <div className={styles.checkbox}>
                                <input style={{width:'1.2rem'}}  type="checkbox" checked={passwordValidation.hasDigit} readOnly />
                                <h6>Contains a digit (0-9)</h6>
                            </div>
                            <div className={styles.checkbox}>
                                <input style={{width:'1.2rem'}}  type="checkbox" checked={passwordValidation.hasSpecialChar} readOnly />
                                <h6>Contains a special character</h6>
                            </div>
                            <div className={styles.checkbox}>
                                <input style={{width:'1.2rem'}} type="checkbox" checked={passwordValidation.hasMinLength} readOnly />
                                <h6>At least 6 characters long</h6>
                            </div>
                        </div>

                        <div className={styles.gCheckboxPDPA}>
                            <div className={styles.checkbox}>
                                <input 
                                    style={{width:'2rem',height:'20px', fontSize:30}} 
                                    type="checkbox" 
                                    id="isPdps" 
                                    checked={isPdpsAgreed} 
                                    onChange={() => setIsPdpsAgreed(!isPdpsAgreed)} 
                                />
                                <label htmlFor="isPdps"> 
                                    <h3>I agree to Terms of Use and Privacy Policy.</h3>
                                </label>
                            </div>
                        </div> 
                    </>
                ) :(
                    <>
                        <div className={styles.gCheckboxPDPA}>
                            <div className={styles.checkbox}>
                                <input 
                                    style={{width:'2rem',height:'20px', fontSize:30}} 
                                    type="checkbox" 
                                    id="isRememberMe" 
                                    checked={isRememberMeAgreed} 
                                    onChange={() => setIsRememberMeAgreed(!isRememberMeAgreed)} 
                                />
                                <label htmlFor="isRememberMe"> 
                                    <h3>Remember me</h3>
                                </label>
                            </div>
                        </div> 
                    </>
                )}
           
            </article>
            <footer className={styles.button}>
                <CButton style={{fontSize:'16px',color:'#fff'}} name={actionType === 'login' ? 'Log In' : 'Sign Up'} />   
            </footer>
            <article className={styles.inputField}>
               {/*  */}
                {actionType === 'login' ? 
                <div className={styles.gLabel}>
                    <h3>
                        Don’t have an account? <Link href={'/auth/sign-up'}><span style={{color:'var(--primary-color)'}}> Sign Up</span></Link>
                    </h3>
                </div> :
                 <div className={styles.gLabel}>
                    <h3>
                        Already have an account? <Link href={'/auth/login'}><span style={{color:'var(--primary-color)'}}> Log In</span></Link>
                    </h3>
                </div>}
            </article>
        </form>
    );
};

export default AuthenticatorForm;
