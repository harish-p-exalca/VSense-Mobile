export class UserWithRole {
    UserID: any;
    RoleID: any;
    UserName: string;
    Plant: string;
    Email: string;
    Password: string;
    ContactNumber: string;
    IsActive: boolean;
    CreatedOn: Date;
    CreatedBy: string;
    ModifiedOn?: Date;
    ModifiedBy: string;
    DisplayName: string;
}
export class UserPreference {
    ID: number;
    UserID: any;
    NavbarPrimaryBackground: string;
    NavbarSecondaryBackground: string;
    ToolbarBackground: string;
    IsActive: boolean;
    CreatedOn: Date;
    CreatedBy: string;
    ModifiedOn?: Date;
    ModifiedBy: string;
}
export class UserView {
    UserID: any;
    UserName: string;
}
export class RoleWithApp {
    RoleID: any;
    RoleName: string;
    AppIDList: number[];
    IsActive: boolean;
    CreatedOn: Date;
    CreatedBy: string;
    ModifiedOn?: Date;
    ModifiedBy: string;
}
export class MenuApp {
    AppID: number;
    AppName: string;
    IsActive: boolean;
    CreatedOn: Date;
    CreatedBy: string;
    ModifiedOn?: Date;
    ModifiedBy: string;
}
export class AppUsage {
    ID: number;
    UserID: any;
    // AppID: number;
    AppName: string;
    UsageCount: number;
    LastUsedOn: Date | string;
    IsActive: boolean;
    CreatedOn: Date | string;
    CreatedBy: string;
    ModifiedOn: Date | string | null;
    ModifiedBy: string;
}
export class AppUsageView {
    ID: number;
    UserID: any;
    UserName: string;
    UserRole: string;
    AppName: string;
    UsageCount: number;
    LastUsedOn: Date | string;
    IsActive: boolean;
    CreatedOn: Date | string;
    CreatedBy: string;
    ModifiedOn: Date | string | null;
    ModifiedBy: string;
}
export class Reason {
    ReasonID: number;
    Description: string;
    IsActive: boolean;
    CreatedOn: Date;
    CreatedBy: string;
    ModifiedOn?: Date;
    ModifiedBy: string;
}
export class AuthenticationDetails {
    IsAuth: boolean;
    UserID: any;
    UserName: string;
    DisplayName: string;
    EmailAddress: string;
    UserRole: string;
    Token: string;
    MenuItemNames: string;
    Profile: string;
    RefreahToken: string;
    Expires: string;
    Issued: string;
    Expiresin: string;
    TourStatus: boolean;
}
export class ChangePassword {
    UserID: any;
    UserName: string;
    CurrentPassword: string;
    NewPassword: string;
}
export class LoginModel {
    UserName: string;
    Password: string;
    clientId: string;
}
export class EMailModel {
    EmailAddress: string;
    siteURL: string;
}
export class ForgotPassword {
    UserID: any;
    EmailAddress: string;
    NewPassword: string;
    Token: string;
}
export class UserNotification {
    ID: number;
    UserID: string;
    Message: string;
    HasSeen: boolean;
    CreatedOn: Date;
    ModifiedOn?: Date;
}
export class VendorUser {
    Email: string;
    Phone: string;
}
export class SessionMaster {
    ID: number;
    ProjectName: string;
    SessionTimeOut: number;
    IsActive: boolean;
    CreatedOn: Date | string;
    CreatedBy: string;
    ModifiedOn: Date | string | null;
    ModifiedBy: string;
}
export class UserLoginHistory {
    ID: number;
    UserID: string;
    UserName: string;
    LoginTime: Date | string;
    LogoutTime: Date | string | null;
    // IP: string;
}
export class LoginHistoryFilter {
    FromDate: string;
    ToDate: string;
    UserName: string;
}
