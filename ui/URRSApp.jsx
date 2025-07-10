import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { supabase } from './supabaseClient'

const sampleTurn = {
  environment: 'Swamp - Nightfall',
  description: `You feel your skin itch from the moisture. Lathra Vex stares into the fog. A cold wind passes.`,
  memory: `"Cursed ritual" echoes in your blood`,
  mutationChance: 'HIGH',
  choices: [
    'Cast “Fire Manipulation” at the swamp fog',
    'Ask Lathra Vex why she’s whispering again',
    'Try to remember where you first learned fire magic',
  ],
}

export default function URRSApp() {
  const [log, setLog] = useState([])
  const [input, setInput] = useState('')

  const saveAction = async (text) => {
    const { error } = await supabase.from('memory_log').insert([{ entry: text }])
    if (error) console.error('Save error:', error)
  }

  const handleChoice = async (choice) => {
    const entry = `🔹 You chose: ${choice}`
    setLog((prev) => [...prev, entry])
    await saveAction(entry)
  }

  const handleSubmit = async () => {
    if (!input.trim()) return
    const entry = `✍️ Custom action: ${input}`
    setLog((prev) => [...prev, entry])
    await saveAction(entry)
    setInput('')
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 font-mono">
      <h1 className="text-2xl mb-4 font-bold">URRS Simulation Interface</h1>

      <Card className="bg-zinc-900 text-white mb-4">
        <CardContent className="space-y-2">
          <p className="text-sm text-zinc-400">🌆 {sampleTurn.environment}</p>
          <p>{sampleTurn.description}</p>
          <p className="italic text-orange-400">🧠 Memory: {sampleTurn.memory}</p>
          <p className="text-red-500">🔥 Mutation Chance: {sampleTurn.mutationChance}</p>

          <div className="space-y-2">
            {sampleTurn.choices.map((c, i) => (
              <Button key={i} onClick={() => handleChoice(c)} className="w-full">
                {i + 1}. {c}
              </Button>
            ))}
          </div>

          <div className="pt-2">
            <Input
              placeholder="Custom action..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              className="bg-zinc-800 border-zinc-600"
            />
            <Button onClick={handleSubmit} className="mt-2 w-full">
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2 text-sm">
        {log.map((entry, idx) => (
          <motion.p
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {entry}
          </motion.p>
        ))}
      </div>
    </div>
  )
}
