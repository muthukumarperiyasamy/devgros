import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { TabsNavigationPage } from '../pages/tabs-navigation/tabs-navigation';
import { WalkthroughPage } from '../pages/walkthrough/walkthrough';
import { SignupPage } from '../pages/signup/signup';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { TermsOfServicePage } from '../pages/terms-of-service/terms-of-service';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { ContactPage } from '../pages/contact/contact';
import { PasswordPage } from '../pages/password/password';
import { NotificationPage } from '../pages/notification/notification';
import { TimeslotPage } from '../pages/shopsettings/shopsettings';
import { DeliveryreportPage } from '../pages/deliveryreport/deliveryreport';
import { HomeorderPage } from '../pages/homeorder/homeorder';
import { Otppage } from '../pages/otppage/otppage';
import { AboutPage } from '../pages/about/about';
import { SubcategoryPage } from '../pages/subcategory/subcategory';
import { Subcategory2Page } from '../pages/subcategory2/subcategory2';
import { AddproductPage } from '../pages/addproduct/addproduct';
import { CategoryPage } from '../pages/category/category';
import { CustomerlistPage } from '../pages/customerlist/customerlist';
import { PaymentstatusPage } from '../pages/paymentstatus/paymentstatus';
import { OrdersPage } from '../pages/orders/orders';
import { FeedbackPage } from '../pages/feedback/feedback';
import { CommentsPage } from '../pages/comments/comments';

import { DataServiceProvider } from '../providers/data-service/data-service';

import { SearchPipe } from './../pipes/search/search';

import { PreloadImage } from '../components/preload-image/preload-image';
import { ShowHideContainer } from '../components/show-hide-password/show-hide-container';
import { ShowHideInput } from '../components/show-hide-password/show-hide-input';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';
import { DatePicker } from '@ionic-native/date-picker';
import { OneSignal } from '@ionic-native/onesignal';
import { TooltipsModule } from 'ionic-tooltips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Market } from '@ionic-native/market';

import { FileTransfer } from '@ionic-native/file-transfer';
import { Camera } from '@ionic-native/camera';  
import { LaunchNavigator } from '@ionic-native/launch-navigator';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,

    LoginPage,
    ProfilePage,
    TabsNavigationPage,
    WalkthroughPage,
    SignupPage,
    ForgotPasswordPage,
    TermsOfServicePage,
    PrivacyPolicyPage,
    TimeslotPage,
    DeliveryreportPage,
    HomeorderPage,
    HomePage,
    ContactPage,
    PasswordPage,
    NotificationPage,
    Otppage,
    AboutPage,
    SubcategoryPage,
    Subcategory2Page,
    AddproductPage,
    CategoryPage,
    CustomerlistPage,
    PaymentstatusPage,
    OrdersPage,
    FeedbackPage,
    CommentsPage,

    PreloadImage,
    ShowHideContainer,
    ShowHideInput,

    SearchPipe,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    TooltipsModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,

    LoginPage,
    ProfilePage,
    TabsNavigationPage,
    WalkthroughPage,
    SignupPage,
    ForgotPasswordPage,
    TermsOfServicePage,
    PrivacyPolicyPage,
    TimeslotPage,
    DeliveryreportPage,
    HomeorderPage,
    HomePage,
    ContactPage,
    PasswordPage,
    NotificationPage,
    Otppage,
    AboutPage,
    SubcategoryPage,
    Subcategory2Page,
    AddproductPage,
    CategoryPage,
    CustomerlistPage,
    PaymentstatusPage,
    OrdersPage,
    FeedbackPage,
    CommentsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    CallNumber,
    EmailComposer,
    OneSignal,
    DatePicker,
    Camera,
    FileTransfer,
    LaunchNavigator,
    Market ,
    
    DataServiceProvider,

    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
