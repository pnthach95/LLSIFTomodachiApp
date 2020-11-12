package com.pnthach95.theme;

import android.app.Activity;
import android.graphics.Color;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ThemeModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    @NonNull
    @Override
    public String getName() {
        return "ThemeModule";
    }

    ThemeModule(ReactApplicationContext context) {
        reactContext = context;
    }

    @ReactMethod
    public void setColor(String color) {
        Activity activity = reactContext.getCurrentActivity();
        if (activity != null) {
            activity.runOnUiThread(() -> activity.getWindow().getDecorView()
                .setBackgroundColor(Color.parseColor(color)));
        }
    }
}
