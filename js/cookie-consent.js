<!-- 쿠키 동의 알림창 HTML -->
<div id="cookie-consent" class="cookie-consent">
    <div class="cookie-content">
        <p>FAKEOVEN은 사용자 경험 개선을 위해 쿠키와 개인정보를 수집합니다.</p>
        <div class="cookie-buttons">
            <button id="cookie-accept" class="cookie-button accept">수락</button>
            <button id="cookie-settings" class="cookie-button settings">설정</button>
        </div>
    </div>
</div>

<!-- 쿠키 설정 모달 -->
<div id="cookie-settings-modal" class="cookie-settings-modal">
    <div class="modal-content">
        <div class="modal-header">
            <h3>개인정보 설정</h3>
            <button id="close-modal" class="close-modal">&times;</button>
        </div>
        <div class="modal-body">
            <div class="cookie-option">
                <label class="toggle">
                    <input type="checkbox" id="essential-cookies" checked disabled>
                    <span class="toggle-slider"></span>
                </label>
                <div class="cookie-option-text">
                    <h4>필수 쿠키</h4>
                    <p>웹사이트 기능을 위해 필요한 필수 쿠키입니다.</p>
                </div>
            </div>
            <div class="cookie-option">
                <label class="toggle">
                    <input type="checkbox" id="analytics-cookies" checked>
                    <span class="toggle-slider"></span>
                </label>
                <div class="cookie-option-text">
                    <h4>분석용 쿠키</h4>
                    <p>사용자 경험을 분석하고 개선하기 위한 통계 데이터를 수집합니다.</p>
                </div>
            </div>
            <div class="cookie-option">
                <label class="toggle">
                    <input type="checkbox" id="marketing-cookies" checked>
                    <span class="toggle-slider"></span>
                </label>
                <div class="cookie-option-text">
                    <h4>마케팅 쿠키</h4>
                    <p>맞춤형 콘텐츠와 광고를 제공하기 위한 정보를 수집합니다.</p>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button id="save-preferences" class="cookie-button accept">설정 저장</button>
        </div>
    </div>
</div>

<!-- CSS 스타일 -->
<style>
    /* 쿠키 동의 알림창 스타일 */
    .cookie-consent {
        position: fixed;
        bottom: -100%;
        left: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 15px 20px;
        z-index: 9999;
        box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.1);
        transition: bottom 0.5s ease;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        font-family: 'Montserrat', 'Noto Sans KR', sans-serif;
        font-weight: 300;
    }
    
    .cookie-consent.show {
        bottom: 0;
    }
    
    .cookie-content {
        max-width: 1400px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    
    .cookie-content p {
        margin: 0;
        padding: 10px 0;
        font-size: 14px;
        letter-spacing: 0.02em;
        line-height: 1.5;
    }
    
    .cookie-buttons {
        display: flex;
        gap: 10px;
    }
    
    .cookie-button {
        background: transparent;
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.3);
        padding: 8px 15px;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: 'Montserrat', 'Noto Sans KR', sans-serif;
        font-weight: 400;
        letter-spacing: 0.05em;
        text-transform: uppercase;
    }
    
    .cookie-button.accept {
        background-color: white;
        color: black;
        border-color: white;
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
        align-items: flex-start;
        margin-bottom: 20px;
        gap: 15px;
    }
    
    .cookie-option-text h4 {
        margin: 0 0 5px 0;
        font-weight: 500;
        font-size: 16px;
    }
    
    .cookie-option-text p {
        margin: 0;
        font-size: 14px;
        opacity: 0.8;
        line-height: 1.5;
    }
    
    .toggle {
        position: relative;
        display: inline-block;
        width: 46px;
        height: 24px;
        margin-top: 2px;
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
        right: 0;
        bottom: 0;
        background-color: #333;
        transition: .4s;
        border-radius: 24px;
    }
    
    .toggle-slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: .4s;
        border-radius: 50%;
    }
    
    input:checked + .toggle-slider {
        background-color: white;
    }
    
    input:checked + .toggle-slider:before {
        transform: translateX(22px);
        background-color: black;
    }
    
    .modal-footer {
        padding: 15px 20px;
        text-align: right;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    /* 모바일 대응 */
    @media (max-width: 768px) {
        .cookie-content {
            flex-direction: column;
            align-items: stretch;
        }
        
        .cookie-buttons {
            margin-top: 10px;
            justify-content: space-between;
        }
        
        .cookie-button {
            flex: 1;
            text-align: center;
        }
        
        .modal-content {
            width: 95%;
        }
    }
    
    /* iOS 안전 영역 고려 */
    @supports (padding-bottom: env(safe-area-inset-bottom)) {
        .cookie-consent {
            padding-bottom: calc(15px + env(safe-area-inset-bottom));
        }
    }
</style>

<!-- JavaScript -->
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const cookieConsent = document.getElementById('cookie-consent');
        const acceptButton = document.getElementById('cookie-accept');
        const settingsButton = document.getElementById('cookie-settings');
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
        
        // 수락 버튼 클릭
        acceptButton.addEventListener('click', function() {
            setCookie('cookie-consent', 'accepted', 365);
            setCookie('analytics-cookies', 'true', 365);
            setCookie('marketing-cookies', 'true', 365);
            cookieConsent.classList.remove('show');
        });
        
        // 설정 버튼 클릭
        settingsButton.addEventListener('click', function() {
            settingsModal.style.display = 'flex';
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
    });
</script>
