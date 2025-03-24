document.addEventListener('DOMContentLoaded', function() {
    // CSS 스타일 추가
    const styleElement = document.createElement('style');
    styleElement.textContent = `
    /* 쿠키 동의 알림창 스타일 */
    .cookie-consent {
        position: fixed;
        bottom: -100%;
        left: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 10px 20px;
        z-index: 9999;
        box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.1);
        transition: bottom 0.5s ease;
        font-family: 'Montserrat', 'Noto Sans KR', sans-serif;
        font-weight: 300;
        max-height: 80px;
        overflow: auto;
    }
    
    .cookie-consent.show {
        bottom: 0;
    }
    
    .cookie-content {
        max-width: 1400px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 0;
    }
    
    .cookie-content p {
        margin: 0;
        padding: 5px 0;
        font-size: 11px;
        letter-spacing: 0.02em;
        line-height: 1.4;
        max-width: 800px;
    }
    
    .cookie-buttons {
        display: flex;
        gap: 15px;
        margin-top: 4px;
    }
    
    .cookie-button {
        background: transparent;
        color: white;
        border: none;
        padding: 3px 0;
        font-size: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: 'Montserrat', 'Noto Sans KR', sans-serif;
        font-weight: 400;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        position: relative;
    }
    
    .cookie-button:not(:last-child)::after {
        content: "|";
        position: absolute;
        right: -8px;
        top: 50%;
        transform: translateY(-50%);
        color: rgba(255, 255, 255, 0.3);
    }
    
    .cookie-button:hover {
        opacity: 0.8;
    }
    
    /* 쿠키 설정 모달 스타일 */
    .cookie-settings-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 10000;
        align-items: center;
        justify-content: center;
    }
    
    .modal-content {
        background-color: black;
        color: white;
        width: 90%;
        max-width: 500px;
        border-radius: 0;
        border: 1px solid rgba(255, 255, 255, 0.1);
        max-height: 90vh;
        overflow-y: auto;
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .modal-header h3 {
        margin: 0;
        font-weight: 500;
        font-size: 18px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
    }
    
    .close-modal {
        background: transparent;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .modal-body {
        padding: 20px;
    }
    
    .cookie-option {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        gap: 25px;
    }
    
    .cookie-option-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    .cookie-option-text h4 {
        margin: 0 0 8px 0;
        font-weight: 500;
        font-size: 14px;
        text-transform: uppercase;
        position: relative;
        z-index: 2;
    }
    
    .cookie-option-text p {
        margin: 0;
        font-size: 12px;
        opacity: 0.8;
        line-height: 1.5;
        text-align: left;
    }
    
    .toggle {
        position: relative;
        display: inline-block;
        width: 20px;
        height: 20px;
        flex-shrink: 0;
    }
    
    .toggle input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    
    .toggle-slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        width: 20px;
        height: 20px;
        border: 1px solid #555;
        transition: .4s;
        border-radius: 50%;
        z-index: 1;
        box-sizing: border-box;
    }
    
    input:checked + .toggle-slider {
        background-color: white;
        border-color: white;
    }
    
    input:disabled + .toggle-slider {
        opacity: 0.6;
        cursor: default;
    }
    
    .modal-footer {
        padding: 15px 20px;
        text-align: right;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .modal-footer .cookie-button.accept {
        font-size: 14px;
        font-weight: 500;
    }
    
    @media (max-width: 768px) {
        .cookie-buttons {
            flex-wrap: nowrap;
            justify-content: center;
            gap: 8px;
            margin-top: 2px;
        }
        
        .cookie-button {
            margin: 0;
            padding: 2px 0;
            font-size: 8px;
        }
        
        .cookie-button:not(:last-child)::after {
            right: -4px;
        }
        
        .cookie-content {
            padding: 13px 0 8px 0;
        }
        
        .cookie-content p {
            font-size: 9px;
            line-height: 1.2;
            padding: 0;
            margin: 0 0 5px 0;
        }
        
        .modal-content {
            width: 95%;
        }
        
        .cookie-consent {
            height: auto;
            max-height: none;
            padding: 0 15px;
            position: fixed;
            bottom: 0 !important;
        }
        
        .cookie-consent.show {
            bottom: 0 !important;
        }
    }
    
    /* iOS 안전 영역 고려 */
    @supports (padding-bottom: env(safe-area-inset-bottom)) {
        .cookie-consent {
            padding-bottom: calc(15px + env(safe-area-inset-bottom));
        }
    }
    `;
    document.head.appendChild(styleElement);

    // HTML 요소 생성 및 추가
    const cookieConsentElement = document.createElement('div');
    cookieConsentElement.id = 'cookie-consent';
    cookieConsentElement.className = 'cookie-consent';
    cookieConsentElement.innerHTML = `
    <div class="cookie-content">
        <p>FAKEOVEN uses cookies to enhance your experience.<br>
        Essential cookies enable basic functions, while analytics and marketing cookies require consent.</p>
        <div class="cookie-buttons">
            <button id="cookie-accept-all" class="cookie-button">ACCEPT ALL</button>
            <button id="cookie-settings" class="cookie-button">SET COOKIE PREFERENCES</button>
            <button id="cookie-decline" class="cookie-button">DECLINE ALL</button>
        </div>
    </div>
    `;
    
    const cookieSettingsModal = document.createElement('div');
    cookieSettingsModal.id = 'cookie-settings-modal';
    cookieSettingsModal.className = 'cookie-settings-modal';
    cookieSettingsModal.innerHTML = `
    <div class="modal-content">
        <div class="modal-header">
            <h3>COOKIE SETTINGS</h3>
            <button id="close-modal" class="close-modal">&times;</button>
        </div>
        <div class="modal-body">
            <div class="cookie-option">
                <label class="toggle">
                    <input type="checkbox" id="essential-cookies" checked disabled>
                    <span class="toggle-slider"></span>
                </label>
                <div class="cookie-option-text">
                    <h4>NECESSARY</h4>
                    <p>Essential cookies required for basic website functionality. They are always active for login and security features and do not store any personally identifiable information.</p>
                </div>
            </div>
            <div class="cookie-option">
                <label class="toggle">
                    <input type="checkbox" id="analytics-cookies" checked>
                    <span class="toggle-slider"></span>
                </label>
                <div class="cookie-option-text">
                    <h4>ANALYTICAL</h4>
                    <p>Cookies that help us understand how visitors interact with our website. They collect information such as visitor numbers, bounce rates, and traffic sources to improve our service.</p>
                </div>
            </div>
            <div class="cookie-option">
                <label class="toggle">
                    <input type="checkbox" id="marketing-cookies" checked>
                    <span class="toggle-slider"></span>
                </label>
                <div class="cookie-option-text">
                    <h4>MARKETING</h4>
                    <p>Cookies used to deliver relevant advertisements on this site or others you may visit. These help provide content based on your interests and browsing habits.</p>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button id="save-preferences" class="cookie-button accept">SAVE SETTINGS</button>
        </div>
    </div>
    `;
    
    // body에 요소 추가
    document.body.appendChild(cookieConsentElement);
    document.body.appendChild(cookieSettingsModal);
    
    // 요소 참조
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptAllButton = document.getElementById('cookie-accept-all');
    const settingsButton = document.getElementById('cookie-settings');
    const declineButton = document.getElementById('cookie-decline');
    const settingsModal = document.getElementById('cookie-settings-modal');
    const closeModal = document.getElementById('close-modal');
    const savePreferences = document.getElementById('save-preferences');
    const analyticsCookies = document.getElementById('analytics-cookies');
    const marketingCookies = document.getElementById('marketing-cookies');
    
    // 쿠키 설정 확인
    if (!getCookie('cookie-consent')) {
        // 0.5초 후 쿠키 알림창 표시 (페이지 로딩 후 자연스럽게)
        setTimeout(function() {
            cookieConsent.classList.add('show');
        }, 500);
    }
    
    // 모두 수락 버튼 클릭
    acceptAllButton.addEventListener('click', function() {
        setCookie('cookie-consent', 'accepted', 365);
        setCookie('analytics-cookies', 'true', 365);
        setCookie('marketing-cookies', 'true', 365);
        cookieConsent.classList.remove('show');
    });
    
    // 설정 버튼 클릭
    settingsButton.addEventListener('click', function() {
        settingsModal.style.display = 'flex';
    });
    
    // 모두 거부 버튼 클릭
    declineButton.addEventListener('click', function() {
        setCookie('cookie-consent', 'declined', 365);
        setCookie('analytics-cookies', 'false', 365);
        setCookie('marketing-cookies', 'false', 365);
        cookieConsent.classList.remove('show');
    });
    
    // 모달 닫기 버튼
    closeModal.addEventListener('click', function() {
        settingsModal.style.display = 'none';
    });
    
    // 설정 저장 버튼
    savePreferences.addEventListener('click', function() {
        setCookie('cookie-consent', 'customized', 365);
        setCookie('analytics-cookies', analyticsCookies.checked ? 'true' : 'false', 365);
        setCookie('marketing-cookies', marketingCookies.checked ? 'true' : 'false', 365);
        
        settingsModal.style.display = 'none';
        cookieConsent.classList.remove('show');
    });
    
    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', function(event) {
        if (event.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
    });
    
    // 이전 설정이 있으면 체크박스 상태 복원
    const analyticsCookieValue = getCookie('analytics-cookies');
    const marketingCookieValue = getCookie('marketing-cookies');
    
    if (analyticsCookieValue) {
        analyticsCookies.checked = (analyticsCookieValue === 'true');
    }
    
    if (marketingCookieValue) {
        marketingCookies.checked = (marketingCookieValue === 'true');
    }
});

// 쿠키 설정 함수
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + value + expires + "; path=/; SameSite=Lax";
}

// 쿠키 가져오기 함수
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
