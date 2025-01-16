'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { X } from 'lucide-react'
import TermsAgreement from './TermsAgreement'

interface AuthFormProps {
  onSubmit: (email: string, password: string, userType: 'individual' | 'business', additionalInfo: string, isLogin: boolean) => void
  onCancel: () => void
}

export default function AuthForm({ onSubmit, onCancel }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [showTerms, setShowTerms] = useState(false)
  const [userType, setUserType] = useState<'individual' | 'business'>('individual')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [hasStartedConfirmation, setHasStartedConfirmation] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isLogin && password !== passwordConfirm) {
      setPasswordMatch(false)
      return
    }
    onSubmit(email, password, userType, additionalInfo, isLogin)
  }

  const handleSignUpClick = () => {
    if (isLogin) {
      setIsLogin(false)
      setShowTerms(true)
    } else {
      setIsLogin(true)
      setShowTerms(false)
    }
  }

  const handleTermsAgree = () => {
    setShowTerms(false)
  }

  if (showTerms) {
    return <TermsAgreement
            onAgree={handleTermsAgree}
            onCancel={() => {
                setShowTerms(false)
                setIsLogin(true)
                }
            }
        />
  }

  return (
    <Card className="w-[350px] relative">
      <Button
        className="absolute top-2 right-2"
        variant="ghost"
        size="icon"
        onClick={onCancel}
      >
        <X className="h-4 w-4" />
      </Button>
      <CardHeader>
        <CardTitle>{isLogin ? '로그인' : '회원가입'}</CardTitle>
        <CardDescription>
          {isLogin ? '계정에 로그인하세요' : '새 계정을 만드세요'}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label>사용자 유형</Label>
              <RadioGroup defaultValue="individual" onValueChange={(value) => setUserType(value as 'individual' | 'business')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="individual" id="individual" />
                  <Label htmlFor="individual">개인 사용자</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="business" id="business" />
                  <Label htmlFor="business">기업 사용자</Label>
                </div>
              </RadioGroup>
            </div>
            {!isLogin && (
              <>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="additionalInfo">
                    {userType === 'individual' ? '이름' : '기업명'}
                  </Label>
                  <Input 
                    id="additionalInfo" 
                    type="text" 
                    placeholder={userType === 'individual' ? '홍길동' : '주식회사 예시'} 
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    required 
                  />
                </div>
                {userType === 'business' && (
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="businessNumber">사업자등록번호</Label>
                    <Input 
                      id="businessNumber" 
                      type="text" 
                      placeholder="123-45-67890" 
                      required 
                    />
                  </div>
                )}
              </>
            )}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">이메일</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">비밀번호</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setPasswordMatch(e.target.value === passwordConfirm)
                }}
                required 
              />
            </div>
            {!isLogin && (
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
                <Input 
                  id="passwordConfirm" 
                  type="password" 
                  value={passwordConfirm}
                  onChange={(e) => {
                    setPasswordConfirm(e.target.value)
                    setPasswordMatch(password === e.target.value)
                    if (!hasStartedConfirmation) {
                      setHasStartedConfirmation(true)
                    }
                  }}
                  required 
                />
                {!passwordMatch && hasStartedConfirmation && (
                  <p className="text-red-500 text-sm">비밀번호가 일치하지 않습니다.</p>
                )}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full bg-black text-white hover:bg-blue-600" type="submit">
            {isLogin ? '로그인' : '회원가입'}
          </Button>
          <Button
            className="mt-2 w-full"
            variant="outline"
            type="button"
            onClick={handleSignUpClick}
          >
            {isLogin ? '회원가입으로 전환' : '로그인으로 전환'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

