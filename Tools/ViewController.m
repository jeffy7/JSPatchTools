//
//  ViewController.m
//  Tools
//
//  Created by cwwng on 16/5/27.
//  Copyright © 2016年 cwwng. All rights reserved.
//

#import "ViewController.h"
#import "RNCryptor.h"
#import "RNEncryptor.h"
#import "RNDecryptor.h"

@interface ViewController ()

@end

@implementation ViewController

-(void)dealloc {
    
    NSLog(@"🔴🔴🔴🔴 Dealloc %@", NSStringFromClass([self class]));
    
    NSLog(@"♻️♻️♻️♻️ Dealloc %@", NSStringFromClass([super class]));
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    NSString *patch = [[NSBundle mainBundle] pathForResource:@"2.9.18.6" ofType:@"js"];
    
    NSData *data = [NSData dataWithContentsOfFile:patch];
    
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,NSUserDomainMask,YES);
    NSString *plistPath = [paths firstObject];
    
    NSString *path = [plistPath stringByAppendingPathComponent:@"2.9.18.6.js"];
    
    //加密
    NSError *error = nil;
    
    NSData *encryptedData = [RNEncryptor encryptData:data
                                        withSettings:kRNCryptorAES256Settings
                                            password:@"cwwng"
                                               error:&error];
    
    BOOL result = [encryptedData writeToFile:path atomically:YES];
    
    if (result) {
        
        NSLog(@"---%@",path);
    }
}

@end
